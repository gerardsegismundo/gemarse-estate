import { PrismaClient, Prisma } from '@prisma/client'
import { wktToGeoJSON } from '@terraformer/wkt'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export type Coordinates = {
  longitude: number
  latitude: number
}

export const parseCoordinates = (wkt: string | undefined): Coordinates => {
  if (!wkt) return { longitude: 0, latitude: 0 }

  const geoJSON: any = wktToGeoJSON(wkt)
  const longitude = geoJSON.coordinates?.[0] ?? 0
  const latitude = geoJSON.coordinates?.[1] ?? 0

  return { longitude, latitude }
}

export const fetchCoordinatesById = async (
  id: number
): Promise<Coordinates> => {
  const result: { coordinates: string }[] = await prisma.$queryRaw`
    SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${id}
  `

  return parseCoordinates(result[0]?.coordinates)
}
