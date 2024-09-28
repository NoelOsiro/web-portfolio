'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getProjects } from '@/services/api'
import OptimizedImage from '@/components/OptimizedImage'
import ProjectModal from '@/components/ProjectModal'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useState(() => {
    getProjects().then(setProjects)
  }, [])

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => openModal(project)}
          >
            <OptimizedImage 
              src={`${process.env.NEXT_PUBLIC_API_URL}${project.attributes.image.data.attributes.url}`} 
              alt={project.attributes.title} 
              width={300} 
              height={200} 
              className="w-full h-48"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{project.attributes.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.attributes.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.attributes.technologies.map((tech) => (
                  <span key={tech} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  )
}