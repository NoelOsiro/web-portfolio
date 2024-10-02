'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Moon, Sun, Menu, X } from 'lucide-react'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <header className="bg-slate-300 dark:bg-gray-900 dark:text-white text-gray-800">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-xl font-bold ">
          Noel Osiro Otieno
        </Link>

        {/* Hamburger Icon for Small Screens */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? null : <Menu size={24} />}
        </button>

        {/* Navigation Links for Large Screens */}
        <motion.ul
          className="hidden md:flex space-x-16 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
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
              {theme === 'dark' ? <Sun size={20} color='black' /> : <Moon size={20} color='white' />}
            </button>
          </li>
        </motion.ul>

        {/* Sidebar for Small Screens */}
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 md:hidden flex flex-col justify-start items-start p-6"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ type: 'tween' }}
          >
            {/* Close (X) Button inside the sidebar */}
            <button
              className="self-end mb-8"
              onClick={toggleSidebar}
              aria-label="Close Menu"
            >
              <X size={30} color='white' />
            </button>

            {/* Sidebar Links */}
            <ul className="space-y-8 text-white text-2xl">
              <li><Link href="/about" className="hover:text-blue-400" onClick={toggleSidebar}>About</Link></li>
              <li><Link href="/projects" className="hover:text-blue-400" onClick={toggleSidebar}>Projects</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400" onClick={toggleSidebar}>Blog</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400" onClick={toggleSidebar}>Contact</Link></li>
              <li>
                <button
                  onClick={() => { toggleTheme(); toggleSidebar(); }}
                  className="p-2 rounded-full bg-gray-800 dark:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun size={30} color='black' /> : <Moon size={30} color='white' />}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

export default Header
