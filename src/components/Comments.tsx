'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getComments, postComment } from '@/services/api'
import { Comment } from '@/types'

interface CommentsProps {
  postId: string
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: '', content: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(postId)
      setComments(fetchedComments)
    }
    fetchComments()
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const comment = await postComment(postId, newComment.content, newComment.author)
      setComments([...comments, comment])
      setNewComment({ author: '', content: '' })
    } catch (error) {
      console.error('Failed to post comment:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length > 0 ? (
        <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={comment.documentId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4"
          >
            <p className="font-semibold">{comment.author}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            <p className="mt-2">{comment.content}</p>
          </motion.div>
        ))}
      </AnimatePresence>) : null
        }
      
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="author"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Comment
          </label>
          <textarea
            id="content"
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </motion.button>
      </form>
    </div>
  )
}