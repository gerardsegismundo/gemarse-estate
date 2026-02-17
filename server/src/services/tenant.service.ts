import { PrismaClient } from '@prisma/client'
import * as propertyService from './property.service' // import your property service

const prisma = new PrismaClient()

export const getTenantByCognitoId = async (cognitoId: string) => {
  return prisma.tenant.findUnique({
    where: { cognitoId },
    include: { favorites: true },
  })
}

export const createTenant = async (data: {
  cognitoId: string
  name: string
  email: string
  phoneNumber: string
}) => {
  return prisma.tenant.create({ data })
}

export const updateTenant = async (
  cognitoId: string,
  data: Partial<{ name: string; email: string; phoneNumber?: string }>
) => {
  return prisma.tenant.update({ where: { cognitoId }, data })
}

export const getCurrentResidencesForTenant = async (cognitoId: string) => {
  const properties = await prisma.property.findMany({
    where: { tenants: { some: { cognitoId } } },
    include: { location: true, manager: true },
  })

  const formattedProperties = await Promise.all(
    properties.map((p) => propertyService.getPropertyById(p.id))
  )

  return formattedProperties.filter(Boolean)
}

export const addFavoriteProperty = async (
  cognitoId: string,
  propertyId: number
) => {
  const tenant = await getTenantByCognitoId(cognitoId)
  if (!tenant) return null

  if (tenant.favorites.some((f) => f.id === propertyId)) return 'exists'

  return prisma.tenant.update({
    where: { cognitoId },
    data: { favorites: { connect: { id: propertyId } } },
    include: { favorites: true },
  })
}

export const removeFavoriteProperty = async (
  cognitoId: string,
  propertyId: number
) => {
  return prisma.tenant.update({
    where: { cognitoId },
    data: { favorites: { disconnect: { id: propertyId } } },
    include: { favorites: true },
  })
}
