import NewsletterSubscription from './NewsLetterSubscription'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            <p>A passionate software developer specializing in web technologies.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
              <li><a href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400">Projects</a></li>
              <li><a href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
              <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <NewsletterSubscription />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer