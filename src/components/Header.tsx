import Link from 'next/link'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className="text-xl font-bold">
              Your Name
            </Link>
          </li>
          <motion.ul className="flex space-x-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link href="/projects" className="hover:text-gray-300">Projects</Link></li>
            <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
          </motion.ul>
        </ul>
      </nav>
    </header>
  )
}

export default Header