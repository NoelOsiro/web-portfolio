'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getProjects } from '@/services/api'
import OptimizedImage from '@/components/OptimizedImage'
import { Project } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
export default function ProjectPage() {
  const params = useParams<{ id: string }>() 
  const [project, setProject] = useState<Project|null>(null)
  const [technologies, setTechnologies] = useState<string[]>([])

  useEffect(() => {
    const fetchProject = async () => {
      const projects = await getProjects()
      const foundProject = projects.find(p => p.documentId === params.id)
      setProject(foundProject || null)
      const tech = Object.values(foundProject?.technologies || []);
      setTechnologies(tech)
    }
    fetchProject()
  }, [params.id])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {project.title}
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <OptimizedImage 
            src={`${API_URL}${project.image.url}`} 
            alt={project.title} 
            width={600} 
            height={400} 
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
          <p className="mb-4">{project.description}</p>
          <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
          <ul className="list-disc list-inside mb-4">
            { technologies.length > 0 ? technologies.map((tech, index) => (
              <motion.li 
              key={tech}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {tech}
            </motion.li>
            )) : <p>No technologies used</p>}
          </ul>         
          <div className="flex space-x-4">
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
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Link href="/projects" className="text-blue-600 hover:underline">
          &larr; Back to Projects
        </Link>
      </motion.div>
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href="/projects" className="text-blue-600 hover:underline">
          &larr; Back to Projects
        </Link>
      </motion.div>
    </div>
  )
}