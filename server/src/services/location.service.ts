import { PrismaClient } from '@prisma/client'

type Location = {
  id: number
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  coordinates: any
}

const prisma = new PrismaClient()

export const createLocation = async (
  address: string,
  city: string,
  state: string,
  country: string,
  postalCode: string,
  longitude: number,
  latitude: number
): Promise<Location> => {
  const [location] = await prisma.$queryRaw<Location[]>`
    INSERT INTO "Location" (address, city, state, country, "postalCode", coordinates)
    VALUES (${address}, ${city}, ${state}, ${country}, ${postalCode}, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
    RETURNING id, address, city, state, country, "postalCode", ST_AsText(coordinates) as coordinates;
  `

  return location
}
