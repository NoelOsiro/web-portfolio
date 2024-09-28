import { motion } from 'framer-motion'
import Image from 'next/image'

// This would typically come from your CMS
const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A brief description of Project 1 and its key features.',
    image: '/placeholder.svg?height=200&width=300',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'An overview of Project 2 and what makes it unique.',
    image: '/placeholder.svg?height=200&width=300',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  // Add more projects as needed
]

export default function Projects() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="border rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Image 
              src={project.image} 
              alt={project.title} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}