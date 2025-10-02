// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import AuthorProfile from '@/components/AuthorProfile'
import Link from 'next/link'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.metadata.full_name} - Author`,
    description: author.metadata.bio || `Read posts by ${author.metadata.full_name}`,
    openGraph: {
      title: `${author.metadata.full_name} - Author`,
      description: author.metadata.bio || `Read posts by ${author.metadata.full_name}`,
      images: author.metadata.profile_picture ? [
        {
          url: `${author.metadata.profile_picture.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`,
          width: 400,
          height: 400,
          alt: author.metadata.full_name,
        }
      ] : [],
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const [author, posts] = await Promise.all([
    getAuthorBySlug(slug),
    getAuthorBySlug(slug).then(author => author ? getPostsByAuthor(author.id) : [])
  ])

  if (!author) {
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

        {/* Author Profile */}
        <div className="mb-16">
          <AuthorProfile author={author} />
        </div>

        {/* Author's Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Posts by {author.metadata.full_name}
          </h2>
          
          {posts && posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">This author hasn't published any posts yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}