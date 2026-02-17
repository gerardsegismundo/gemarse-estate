// services/property.service.ts
import { PrismaClient, Prisma } from '@prisma/client'
import { uploadFilesToS3 } from './s3.service'
import { getCoordinatesFromAddress } from './geocode.service'
import { createLocation } from './location.service'
import { wktToGeoJSON } from '@terraformer/wkt'

const prisma = new PrismaClient()

export type PropertyInput = {
  files: Express.Multer.File[]
  managerCognitoId: string
  propertyData: any
  address: string
  city: string
  state: string
  country: string
  postalCode: string
}

export type PropertyFilters = {
  favoriteIds?: number[]
  priceMin?: number
  priceMax?: number
  beds?: number | 'any'
  baths?: number | 'any'
  squareFeetMin?: number
  squareFeetMax?: number
  propertyType?: string
  amenities?: string[]
  availableFrom?: Date
  latitude?: number
  longitude?: number
}

export const getPropertyById = async (id: number) => {
  const property = await prisma.property.findUnique({
    where: { id },
    include: { location: true },
  })

  if (!property) return null

  const coordinates: { coordinates: string }[] =
    await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property.location.id}`

  const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || '')
  const longitude = geoJSON.coordinates[0]
  const latitude = geoJSON.coordinates[1]

  return {
    ...property,
    location: {
      ...property.location,
      coordinates: { longitude, latitude },
    },
  }
}

export const getFilteredProperties = async (filters: PropertyFilters) => {
  const where: any = {}

  if (filters.favoriteIds && filters.favoriteIds.length > 0) {
    where.id = { in: filters.favoriteIds }
  }

  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    where.pricePerMonth = {}
    if (filters.priceMin !== undefined)
      where.pricePerMonth.gte = filters.priceMin
    if (filters.priceMax !== undefined)
      where.pricePerMonth.lte = filters.priceMax
  }

  if (filters.beds !== undefined && filters.beds !== 'any') {
    where.beds = filters.beds
  }

  if (filters.baths !== undefined && filters.baths !== 'any') {
    where.baths = filters.baths
  }

  if (
    filters.squareFeetMin !== undefined ||
    filters.squareFeetMax !== undefined
  ) {
    where.squareFeet = {}
    if (filters.squareFeetMin !== undefined)
      where.squareFeet.gte = filters.squareFeetMin
    if (filters.squareFeetMax !== undefined)
      where.squareFeet.lte = filters.squareFeetMax
  }

  if (filters.propertyType) {
    where.propertyType = filters.propertyType
  }

  if (filters.amenities && filters.amenities.length > 0) {
    where.amenities = { hasSome: filters.amenities }
  }

  if (filters.availableFrom) {
    where.availableFrom = { lte: filters.availableFrom }
  }

  let properties = await prisma.property.findMany({
    where,
    include: { location: true },
  })

  // Filter by location proximity if coordinates are provided
  if (filters.latitude !== undefined && filters.longitude !== undefined) {
    const RADIUS_KM = 50
    const radiusMeters = RADIUS_KM * 1000
    
    const nearbyLocationIds: { id: number }[] = await prisma.$queryRaw`
      SELECT id
      FROM "Location"
      WHERE ST_DWithin(
        coordinates::geography,
        ST_SetSRID(ST_MakePoint(${filters.longitude}, ${filters.latitude}), 4326)::geography,
        ${radiusMeters}
      )
    `
    
    const locationIds = nearbyLocationIds.map(loc => loc.id)
    
    properties = properties.filter(p => locationIds.includes(p.locationId))
  }

  const propertiesWithCoordinates = await Promise.all(
    properties.map(async (property) => {
      const coordinates: { coordinates: string }[] =
        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property.location.id}`

      const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || '')
      const longitude = geoJSON.coordinates[0]
      const latitude = geoJSON.coordinates[1]

      return {
        ...property,
        location: {
          ...property.location,
          coordinates: { longitude, latitude },
        },
      }
    })
  )

  return propertiesWithCoordinates
}

export const createPropertyWithLocationAndPhotos = async ({
  files,
  managerCognitoId,
  propertyData,
  address,
  city,
  state,
  country,
  postalCode,
}: PropertyInput) => {
  const photoUrls = await uploadFilesToS3(files, 'properties')
  const [longitude, latitude] = await getCoordinatesFromAddress({
    street: address,
    city,
    state,
    country,
    postalCode,
  })

  const location = await createLocation(
    address,
    city,
    state,
    country,
    postalCode,
    longitude,
    latitude
  )

  const property = await prisma.property.create({
    data: {
      ...propertyData,
      photoUrls,
      locationId: location.id,
      managerCognitoId,
      amenities:
        typeof propertyData.amenities === 'string'
          ? propertyData.amenities.split(',')
          : [],
      highlights:
        typeof propertyData.highlights === 'string'
          ? propertyData.highlights.split(',')
          : [],
      isPetsAllowed: propertyData.isPetsAllowed === 'true',
      isParkingIncluded: propertyData.isParkingIncluded === 'true',
      pricePerMonth: parseFloat(propertyData.pricePerMonth),
      securityDeposit: parseFloat(propertyData.securityDeposit),
      applicationFee: parseFloat(propertyData.applicationFee),
      beds: parseInt(propertyData.beds),
      baths: parseFloat(propertyData.baths),
      squareFeet: parseInt(propertyData.squareFeet),
    },
    include: { location: true, manager: true },
  })

  return property
}
