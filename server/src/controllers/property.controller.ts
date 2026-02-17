import { Request, Response } from 'express'

import {
  getPropertyById,
  getFilteredProperties,
  PropertyFilters,
  createPropertyWithLocationAndPhotos,
} from '../services/property.service'

export const getProperty = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const property = await getPropertyById(Number(id))
    if (!property)
      return res.status(404).json({ message: 'Property not found' })
    res.json(property)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const getProperties = async (req: Request, res: Response) => {
  const {
    favoriteIds,
    priceMin,
    priceMax,
    beds,
    baths,
    squareFeetMin,
    squareFeetMax,
    propertyType,
    amenities,
    availableFrom,
    latitude,
    longitude,
  } = req.query

  const filters: PropertyFilters = {
    favoriteIds: favoriteIds
      ? (favoriteIds as string).split(',').map(Number)
      : undefined,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    beds: beds ? (beds === 'any' ? 'any' : Number(beds)) : undefined,
    baths: baths ? (baths === 'any' ? 'any' : Number(baths)) : undefined,
    squareFeetMin: squareFeetMin ? Number(squareFeetMin) : undefined,
    squareFeetMax: squareFeetMax ? Number(squareFeetMax) : undefined,
    propertyType:
      propertyType && propertyType !== 'any' ? String(propertyType) : undefined,
    amenities: amenities ? (amenities as string).split(',') : undefined,
    availableFrom: availableFrom
      ? new Date(availableFrom as string)
      : undefined,
    latitude: latitude ? Number(latitude) : undefined,
    longitude: longitude ? Number(longitude) : undefined,
  }

  try {
    const properties = await getFilteredProperties(filters)
    res.json(properties)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const createProperty = async (req: Request, res: Response) => {
  try {
    const newProperty = await createPropertyWithLocationAndPhotos({
      files: req.files as Express.Multer.File[],
      managerCognitoId: req.body.managerCognitoId,
      propertyData: req.body,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postalCode: req.body.postalCode,
    })

    res.status(201).json(newProperty)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
