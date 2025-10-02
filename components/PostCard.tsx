import Link from 'next/link'
import { Post } from '@/types'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDate = post.metadata.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
      {/* Featured Image */}
      {post.metadata.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={post.metadata.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={post.metadata.category} />
          <span className="text-sm text-gray-500">{publishedDate}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.metadata.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author */}
        <div className="flex items-center justify-between">
          <AuthorCard author={post.metadata.author} compact />
          <Link
            href={`/posts/${post.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}