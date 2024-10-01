'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getProjects } from '@/services/api'
import OptimizedImage from '@/components/OptimizedImage'
import { Project } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getProjects().then((fetchedProjects) => {
      setProjects(fetchedProjects)
      setFilteredProjects(fetchedProjects)
    })
  }, [])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => 
        project.technologies.includes(filter)
      ))
    }
  }, [filter, projects])

  // const uniqueTechnologies = Array.from(new Set(projects.flatMap(project => project.technologies)))

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
      
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <label htmlFor="filter" className="mr-2">Filter by technology:</label>
        <select 
          id="filter"
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All</option>
          {/* {uniqueTechnologies.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))} */}
        </select>
      </motion.div>
      {filteredProjects.length === 0 && (
            <motion.div
              key="empty"
              className="text-2xl h-96 m-auto flex justify-center items-center font-semibold col-span-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              No projects found
            </motion.div>
          )}

      <AnimatePresence>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >

         
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.documentId}
              className="border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              layout
            >
              <Link href={`/projects/${project.documentId}`}>
                <OptimizedImage 
                  src={`${API_URL}${project.image.url}`} 
                  alt={project.title} 
                  width={300} 
                  height={200} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {/* {project.technologies.map((tech) => (
                      <span key={tech} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {tech}
                      </span>
                    ))} */}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}