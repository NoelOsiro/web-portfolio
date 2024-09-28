import { motion } from 'framer-motion'
import Link from 'next/link'
import { getBlogPosts } from '@/services/api'

export default async function Blog() {
  const posts = await getBlogPosts()

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
      <div className="space-y-8">
        {posts.map((post, index) => (
          <motion.article 
            key={post.id}
            className="border-b pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                {post.attributes.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              By {post.attributes.author} on {new Date(post.attributes.date).toLocaleDateString()}
            </p>
            <p className="text-gray-800">
              {post.attributes.content.substring(0, 200)}...
            </p>
            <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline mt-2 inline-block">
              Read more
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  )
}