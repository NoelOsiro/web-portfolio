'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getBlogPosts } from '@/services/api'
import { Search } from 'lucide-react'
import { BlogPost } from '@/types'
import OptimizedImage from '@/components/OptimizedImage'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'


export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      const fetchedPosts = await getBlogPosts(searchTerm)
      setPosts(fetchedPosts)
      setIsLoading(false)
    }

    fetchPosts()
  }, [searchTerm])

  console.log(posts)
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blog
      </motion.h1>
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </motion.div>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center"
        >
          Loading...
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {posts.map((post, index) => (
            <motion.div 
              key={post.documentId}
              className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              layout
            >
              <Link href={`/blog/${post.documentId}`}>
                <OptimizedImage 
                  src={`${API_URL}${post.mainimage.url}`} 
                  alt={post.title} 
                  width={300} 
                  height={200} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.title}</p>
                  <div className="flex flex-wrap gap-2">
                  <Link href={`/blog/${post.documentId}`} className="text-blue-600 dark:text-blue-400 hover:underline inline-block">
                    Read more
                  </Link>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        </AnimatePresence>
        
      )}
      {posts.length === 0 && (
            <motion.div
              key="empty"
              className="text-2xl h-96 m-auto flex justify-center items-center font-semibold col-span-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              No projects found
            </motion.div>
          )}
    </div>
  )
}