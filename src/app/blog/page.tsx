'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getBlogPosts } from '@/services/api'
import { BlogPost } from '@/types'
import { Search } from 'lucide-react'

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
      <div className="mb-8">
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
      </div>
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
          {posts.length > 0 ? (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {posts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  className="border-b pb-8 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    <Link href={`/blog/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.attributes.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    By {post.attributes.author} on {new Date(post.attributes.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {post.attributes.content.substring(0, 200)}...
                  </p>
                  <Link href={`/blog/${post.id}`} className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
                    Read more
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              No blog posts found.
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}