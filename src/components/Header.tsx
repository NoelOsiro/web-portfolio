'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className="text-xl font-bold">
              Your Name
            </Link>
          </li>
          <motion.ul className="flex space-x-4 items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link href="/projects" className="hover:text-gray-300">Projects</Link></li>
            <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            <li>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
          </motion.ul>
        </ul>
      </nav>
    </header>
  )
}

export default Header