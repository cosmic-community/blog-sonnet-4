import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'small' | 'medium' | 'large'
}

export default function CategoryBadge({ category, size = 'medium' }: CategoryBadgeProps) {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  }

  const bgColor = category.metadata.color || '#6b7280'

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`category-badge inline-flex items-center rounded-full font-medium transition-opacity hover:opacity-80 ${sizeClasses[size]}`}
      style={{
        backgroundColor: bgColor + '15', // 15 is hex for ~8% opacity
        color: bgColor,
        border: `1px solid ${bgColor}25` // 25 is hex for ~15% opacity
      }}
    >
      {category.metadata.icon && (
        <span className="mr-1">{category.metadata.icon}</span>
      )}
      {category.metadata.name}
    </Link>
  )
}