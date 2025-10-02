import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Modern Blog Platform',
  description: 'A modern blog platform built with Next.js and Cosmic CMS',
  keywords: 'blog, Next.js, Cosmic CMS, TypeScript, React',
  authors: [{ name: 'Modern Blog Platform' }],
  openGraph: {
    title: 'Modern Blog Platform',
    description: 'A modern blog platform built with Next.js and Cosmic CMS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog Platform',
    description: 'A modern blog platform built with Next.js and Cosmic CMS',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Access environment variable on server side
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Pass bucket slug as prop to client component */}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}