export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Welcome to Our Modern Blog
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 text-balance">
            Discover insightful articles about technology, marketing, and lifestyle from our expert authors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#posts"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Read Latest Posts
            </a>
            <a
              href="#categories"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Browse Categories
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}