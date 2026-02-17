import { Metadata } from 'next'

/**
 * Page-specific metadata overrides
 * Use these in individual page.tsx files to override the default metadata
 */

// Static metadata for regular pages
export const pageMetadata: Record<string, Metadata> = {
  '/': {
    title: 'Home',
    description:
      'Discover premium properties with Gemarse Estate. Find your perfect home with our curated selection of luxury real estate listings.',
  },
  '/search': {
    title: 'Search Properties',
    description:
      'Browse our curated selection of premium properties. Find apartments, houses, and luxury homes for rent and sale.',
  },
  '/about': {
    title: 'About Us',
    description:
      'Learn about Gemarse Estate and our mission to provide premium real estate services to our clients.',
  },
  '/contact': {
    title: 'Contact Us',
    description:
      'Get in touch with Gemarse Estate. Contact us for property inquiries, viewings, and more.',
  },
  '/faq': {
    title: 'FAQ',
    description:
      'Frequently asked questions about renting, buying, and our real estate services.',
  },
  '/terms': {
    title: 'Terms of Service',
    description:
      'Read our terms of service and understand the conditions for using Gemarse Estate services.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'Learn how Gemarse Estate protects your privacy and handles your personal information.',
  },
}

/**
 * Generate dynamic metadata for property detail pages
 * Use in [id]/page.tsx with generateMetadata function
 */
export async function generatePropertyMetadata(
  propertyId: number,
  propertyTitle?: string,
  propertyAddress?: string,
  propertyPrice?: number
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gemarse.com'

  const title = propertyTitle
    ? propertyTitle
    : `Property ${propertyId} | Gemarse Estate`

  const description = propertyAddress
    ? `View property at ${propertyAddress}. ${
        propertyPrice ? `Price: $${propertyPrice.toLocaleString()}` : ''
      } Discover this premium listing on Gemarse Estate.`
    : `View property details on Gemarse Estate. Discover premium real estate listings.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/search/${propertyId}`,
      type: 'website',
      siteName: 'Gemarse Estate',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  }
}

/**
 * Type for page metadata function
 */
export type PageMetadataGenerator = () => Promise<Metadata> | Metadata
