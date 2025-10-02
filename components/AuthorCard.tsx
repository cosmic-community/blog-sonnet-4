import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
  compact?: boolean
}

export default function AuthorCard({ author, compact = false }: AuthorCardProps) {
  if (compact) {
    return (
      <Link 
        href={`/authors/${author.slug}`}
        className="flex items-center space-x-3 group"
      >
        {author.metadata.profile_picture && (
          <img
            src={`${author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={author.metadata.full_name}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
            {author.metadata.full_name}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      {author.metadata.profile_picture && (
        <Link href={`/authors/${author.slug}`}>
          <img
            src={`${author.metadata.profile_picture.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={author.metadata.full_name}
            className="w-12 h-12 rounded-full object-cover hover:scale-105 transition-transform"
          />
        </Link>
      )}
      <div>
        <Link
          href={`/authors/${author.slug}`}
          className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
        >
          {author.metadata.full_name}
        </Link>
        {author.metadata.bio && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {author.metadata.bio}
          </p>
        )}
      </div>
    </div>
  )
}