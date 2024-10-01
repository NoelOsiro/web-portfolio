'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className=" dark:bg-gray-900 bg-slate-300 dark:text-white text-gray-800">
      <nav className="container mx-auto px-6 py-6">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className="text-xl font-bold">
              Noel Osiro Otieno
            </Link>
          </li>
          <motion.ul className="flex space-x-16 items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link href="/projects" className="hover:text-blue-400">Projects</Link></li>
            <li><Link href="/blog" className="hover:text-blue-400">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
            <li>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-800 dark:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} color='black' /> : <Moon size={20} color='white'/>}
              </button>
            </li>
          </motion.ul>
        </ul>
      </nav>
    </header>
  )
}

export default Header