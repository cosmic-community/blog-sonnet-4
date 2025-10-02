/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com']
  },
  typescript: {
    // Enable TypeScript checking during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Run ESLint during build
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Disable typed routes to prevent complex TypeScript errors
    typedRoutes: false,
  }
}

module.exports = nextConfig