'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getProjects } from '@/services/api'
import OptimizedImage from '@/components/OptimizedImage'
import { Project } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from 'next-sanity'
import { TypedObject } from 'sanity'


export default function ProjectPage() {
  const params = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      const projects = await getProjects()
      const foundProject = projects.find((p) => p._id === params.id)
      setProject(foundProject || null)
    }
    fetchProject()
  }, [params.id])

  if (!project) {
    return <div className="text-center py-20">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 text-center md:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {project.title}
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="w-full">
          <OptimizedImage
            src={urlFor(project.imageUrl).width(600).height(400).url()}
            alt={project.title}
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
          <p className="mb-6">{project.description}</p>

          <motion.div
            className="text-gray-600 dark:text-gray-400 mb-8 flex items-center" // Add flex for alignment
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {project.author?.image && ( // Check if the image exists
              <OptimizedImage
                src={urlFor(project.author.image).width(40).height(40).url()} // Use your existing image URL builder
                alt={project.author.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full mr-2" // Adjust size and add margin
              />
            )}
            <span className="ml-4">
              By {project.author.name} <br /> {project.publishedAt.split('T')[0]}
            </span>
          </motion.div>
          <div className="flex flex-wrap space-x-4 mb-4">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View on GitHub
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="prose max-w-none dark:prose-invert mt-8"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        id="post-content"
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <PortableText
          value={project.body as TypedObject[]} // Type assertion to let TypeScript know it's an array of Block

        />
      </motion.div>
      
      <motion.div
        className="mt-12 text-center md:text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Link href="/projects" className="text-blue-600 hover:underline">
          &larr; Back to Projects
        </Link>
      </motion.div>
    </div>
  )
}
