// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata.name} - Blog Category`,
    description: category.metadata.description || `Browse posts in the ${category.metadata.name} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryBySlug(slug).then(cat => cat ? getPostsByCategory(cat.id) : [])
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            ← Back to Blog
          </Link>
        </nav>

        {/* Category Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <CategoryBadge category={category} size="large" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {category.metadata.name}
          </h1>
          
          {category.metadata.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-8">
              {category.metadata.description}
            </p>
          )}
        </header>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}