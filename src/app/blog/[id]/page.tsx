'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getBlogPost } from '@/services/api'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import Comments from '@/components/Comments'
import { BlogPost as Post } from '@/types'
import OptimizedImage from '@/components/OptimizedImage'
import { marked } from 'marked'
import './post.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
export default function BlogPost() {
  const params = useParams<{ id: string }>()  // Extracts the blog post ID from the URL params
  const [post, setPost] = useState<Post | null>(null)
  const [error, setError] = useState<boolean>(false)  // Handle errors


  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await getBlogPost(params.id)
        if (fetchedPost) {
          setPost(fetchedPost)
        } else {
          setError(true)  // Handle cases where the post is not found
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError(true)
      }
    }

    if (params.id) fetchPost()  // Fetch the post only if ID exists
  }, [params.id])

  // If there's an error or no post, render a 404 page
  if (error) {
    return notFound()
  }

  // Show loading state while fetching
  if (!post) {
    return <div>Loading...</div>
  }

  const htmlContent = marked(post.content);

  return (
    <motion.article 
      className="container mx-auto px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
        <OptimizedImage
            src={`${API_URL}${post.mainimage.url}`}
            alt={post.title}
            width={400}
            height={400}
            className="rounded-lg shadow-lg mb-8"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
          <motion.p className="text-4xl font-bold mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        >{post.title}
        </motion.p>  
        <motion.div 
        className="text-gray-600 dark:text-gray-400 mb-8"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        By {post.author} on {new Date(post.date).toLocaleDateString()}
      </motion.div>           
          
        </div>
      </motion.div>
      
      <motion.div 
        className="prose max-w-none dark:prose-invert mt-8"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        id='post-content'
        transition={{ delay: 0.4, duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <Comments postId={post.documentId} />
    </motion.article>
  )
}
