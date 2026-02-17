import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Disable React Strict Mode temporarily for faster dev
  reactStrictMode: false,

  // Skip ESLint and TypeScript checks during dev for speed
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Webpack tweaks for faster file watching on Windows/WSL
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // check files every 1 second
      aggregateTimeout: 300, // wait 0.3s before rebuild
      ignored: ['**/node_modules', '**/.next'], // ignore heavy folders
    }
    return config
  },
}

export default nextConfig
