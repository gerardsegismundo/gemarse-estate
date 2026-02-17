import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

// Insert PostGIS locations
async function insertLocationData(locations: Array<any>) {
  for (const location of locations) {
    const { id, country, city, state, address, postalCode, coordinates } =
      location
    try {
      await prisma.$executeRaw`
        INSERT INTO "Location" ("id", "country", "city", "state", "address", "postalCode", "coordinates")
        VALUES (${id}, ${country}, ${city}, ${state}, ${address}, ${postalCode}, ST_GeomFromText(${coordinates}, 4326))
      `
      console.log(`Inserted location for ${city}`)
    } catch (error) {
      console.error(`Error inserting location for ${city}:`, error)
    }
  }
}

// Reset Postgres sequences for a table
async function resetSequence(modelName: string) {
  const quotedModelName = `"${toPascalCase(modelName)}"`

  const maxIdResult = await (prisma as any)[toCamelCase(modelName)].findMany({
    select: { id: true },
    orderBy: { id: 'desc' },
    take: 1,
  })

  if (maxIdResult.length === 0) return

  const nextId = maxIdResult[0].id + 1

  await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('${quotedModelName}', 'id'), COALESCE(MAX(id)+1, ${nextId}), false)
    FROM ${quotedModelName};
  `)

  console.log(`Reset sequence for ${modelName} to ${nextId}`)
}

// Delete all data respecting dependencies
async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((file) =>
    toPascalCase(path.basename(file, path.extname(file)))
  )

  for (const modelName of modelNames.reverse()) {
    const modelNameCamel = toCamelCase(modelName)
    const model = (prisma as any)[modelNameCamel]

    if (!model) {
      console.error(`Model ${modelName} not found`)
      continue
    }

    try {
      await model.deleteMany({})
      console.log(`Cleared data from ${modelName}`)
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error)
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, 'seedData')

  const orderedFileNames = [
    'location.json', // No dependencies
    'manager.json', // No dependencies
    'property.json', // Depends on location + manager
    'tenant.json', // No dependencies
    'lease.json', // Depends on property + tenant
    'application.json', // Depends on property + tenant
    'payment.json', // Depends on lease
  ]

  await deleteAllData(orderedFileNames)

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName)
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const modelName = toPascalCase(
      path.basename(fileName, path.extname(fileName))
    )
    const modelNameCamel = toCamelCase(modelName)

    if (modelName === 'Location') {
      await insertLocationData(jsonData)
    } else {
      const model = (prisma as any)[modelNameCamel]
      try {
        // Insert all items in parallel for speed
        await Promise.all(
          jsonData.map((item: any) => model.create({ data: item }))
        )
        console.log(`Seeded ${modelName} from ${fileName}`)
      } catch (error) {
        console.error(`Error seeding ${modelName}:`, error)
      }
    }

    await resetSequence(modelName)
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
