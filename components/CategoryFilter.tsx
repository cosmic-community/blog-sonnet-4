'use client'

import { useState } from 'react'
import { Category } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section id="categories" className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Browse by Category
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-3 rounded-full font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Posts
        </button>
        
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryBadge category={category} />
          </div>
        ))}
      </div>
      
      <p className="text-gray-600 mt-4 text-sm">
        Click on any category to explore related posts
      </p>
    </section>
  )
}