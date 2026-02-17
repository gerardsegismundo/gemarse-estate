// services/manager.service.ts
import { prisma } from '../lib/prisma'
import { wktToGeoJSON } from '@terraformer/wkt'

export type ManagerCreateData = {
  cognitoId: string
  name: string
  email: string
  phoneNumber?: string
}

export type ManagerUpdateData = {
  name?: string
  email?: string
  phoneNumber?: string
}

export const fetchManager = async (cognitoId: string) => {
  return prisma.manager.findUnique({ where: { cognitoId } })
}

export const createManager = async (data: ManagerCreateData) => {
  const prismaData: any = {
    cognitoId: data.cognitoId,
    name: data.name,
    email: data.email,
  }

  if (data.phoneNumber !== undefined) {
    prismaData.phoneNumber = data.phoneNumber
  }

  return prisma.manager.create({ data: prismaData })
}

export const updateManager = async (
  cognitoId: string,
  data: ManagerUpdateData
) => {
  return prisma.manager.update({
    where: { cognitoId },
    data,
  })
}

export const fetchManagerProperties = async (cognitoId: string) => {
  const properties = await prisma.property.findMany({
    where: { managerCognitoId: cognitoId },
    include: { location: true },
  })

  // Get coordinates for each property using raw SQL
  const propertiesWithCoordinates = await Promise.all(
    properties.map(async (property) => {
      const coordinates: { coordinates: string }[] =
        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property.location.id}`

      const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || '')
      const longitude = geoJSON.coordinates?.[0]
      const latitude = geoJSON.coordinates?.[1]

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
