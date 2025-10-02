export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold">Modern Blog</span>
            </div>
            <p className="text-gray-400">
              A modern blog platform built with Next.js and Cosmic CMS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#categories" className="text-gray-400 hover:text-white transition-colors">
                  Categories
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              This blog showcases the power of modern web development with Next.js 15,
              TypeScript, and Cosmic as a headless CMS solution.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Modern Blog Platform. Built with Next.js and Cosmic.
          </p>
        </div>
      </div>
    </footer>
  )
}