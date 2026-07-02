// services/manager.service.ts
import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { fetchCoordinatesById } from '../utils/coordinates'

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
  const prismaData: Prisma.ManagerCreateInput = {
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

  const propertiesWithCoordinates = await Promise.all(
    properties.map(async (property: (typeof properties)[number]) => {
      const { longitude, latitude } = await fetchCoordinatesById(property.location.id)

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
