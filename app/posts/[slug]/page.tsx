// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostContent from '@/components/PostContent'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metadata.title,
    description: post.metadata.excerpt || 'Read this blog post',
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt || 'Read this blog post',
      images: post.metadata.featured_image ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        }
      ] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.metadata.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      {post.metadata.featured_image && (
        <div className="relative h-64 md:h-96 mb-8">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.metadata.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            ← Back to Blog
          </Link>
        </nav>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <CategoryBadge category={post.metadata.category} />
            <span className="text-gray-500 text-sm">{publishedDate}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            {post.metadata.title}
          </h1>
          
          {post.metadata.excerpt && (
            <p className="text-xl text-gray-600 leading-8 text-balance">
              {post.metadata.excerpt}
            </p>
          )}
        </header>

        {/* Author Info */}
        <div className="mb-8">
          <AuthorCard author={post.metadata.author} />
        </div>

        {/* Post Content */}
        <div className="mb-12">
          <PostContent content={post.metadata.content} />
        </div>

        {/* Tags */}
        {post.metadata.tags && (
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}