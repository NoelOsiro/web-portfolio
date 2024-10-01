'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // TODO: Replace with actual API call to your newsletter service
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      setStatus('success')
      setEmail('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Subscribe to my newsletter</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
          required
        />
        <motion.button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </motion.button>
      </form>
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-green-600 dark:text-green-400"
        >
          Thank you for subscribing!
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-red-600 dark:text-red-400"
        >
          An error occurred. Please try again later.
        </motion.p>
      )}
    </div>
  )
}

export default NewsletterSubscription