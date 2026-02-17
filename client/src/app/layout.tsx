import type { Metadata } from 'next'
import Providers from './providers'
import './globals.css'
import Navbar from '@/components/Navbar'
import ClientLayoutWrapper from './ClientLayoutWrapper'

export const metadata: Metadata = {
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  title: {
    default: 'Gemarse Estate | Premium Real Estate',
    template: '%s | Gemarse Estate',
  },
  description:
    'Discover premium properties with Gemarse Estate. Find your perfect home with our curated selection of luxury real estate listings.',
  keywords: [
    'real estate',
    'property listings',
    'luxury homes',
    'apartments for rent',
    'houses for sale',
  ],
  authors: [{ name: 'Gemarse Estate' }],
  creator: 'Gemarse Estate',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gemarse.com',
    siteName: 'Gemarse Estate',
    title: 'Gemarse Estate | Premium Real Estate',
    description:
      'Discover premium properties with Gemarse Estate. Find your perfect home.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gemarse Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemarse Estate | Premium Real Estate',
    description:
      'Discover premium properties with Gemarse Estate. Find your perfect home.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Navbar />
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
