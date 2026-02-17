import { Metadata } from 'next'
import { generatePropertyMetadata } from '@/lib/seo'
import SingleListingClient from './SingleListingClient'

// Dynamic metadata for property detail pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const propertyId = Number(id)

  // In a real app, you would fetch the property data here
  // const property = await getProperty(propertyId)
  // return generatePropertyMetadata(propertyId, property.title, property.address, property.price)

  // For now, return basic metadata
  return generatePropertyMetadata(propertyId)
}

export default async function SingleListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <SingleListingClient propertyId={Number(id)} />
}
