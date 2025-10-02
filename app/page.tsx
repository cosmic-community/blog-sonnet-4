import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ])

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Posts Found</h1>
          <p className="text-gray-600">There are no blog posts available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="mb-12">
          <CategoryFilter categories={categories} />
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}