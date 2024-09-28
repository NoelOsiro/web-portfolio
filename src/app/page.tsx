'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale }}
      className="container mx-auto px-6 py-12"
    >
      <motion.section 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl mb-6">I&apos;m a software developer specializing in web technologies.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Get in Touch
          </Link>
        </motion.div>
      </motion.section>

      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="mb-4">A passionate developer with a keen interest in creating efficient and scalable web solutions...</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/about" className="text-blue-500 hover:underline">Learn more about me</Link>
        </motion.div>
      </motion.section>

      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="border p-4 rounded"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-bold mb-2">Project 1</h3>
            <p>Brief description of Project 1...</p>
          </motion.div>
          <motion.div 
            className="border p-4 rounded"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-bold mb-2">Project 2</h3>
            <p>Brief description of Project 2...</p>
          </motion.div>
        </div>
        <div className="mt-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/projects" className="text-blue-500 hover:underline">View all projects</Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="border p-4 rounded"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-bold mb-2">Blog Post 1</h3>
            <p>Brief excerpt from Blog Post 1...</p>
          </motion.div>
          <motion.div 
            className="border p-4 rounded"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-bold mb-2">Blog Post 2</h3>
            <p>Brief excerpt from Blog Post 2...</p>
          </motion.div>
        </div>
        <div className="mt-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/blog" className="text-blue-500 hover:underline">Read all blog posts</Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}