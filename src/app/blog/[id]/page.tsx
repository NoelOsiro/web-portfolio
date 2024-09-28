import { motion } from 'framer-motion'
import { getBlogPosts } from '@/services/api'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

async function getPost(id: string) {
  const posts = await getBlogPosts()
  return posts.find((post) => post.id === id)
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <motion.article 
      className="container mx-auto px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {post.attributes.title}
      </motion.h1>
      <motion.div 
        className="text-gray-600 mb-8"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        By {post.attributes.author} on {new Date(post.attributes.date).toLocaleDateString()}
      </motion.div>
      <motion.div 
        className="prose max-w-none"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: post.attributes.content }}
      />
    </motion.article>
  )
}