import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

type ProjectModalProps = {
  project: {
    id: string
    attributes: {
      title: string
      description: string
      image: {
        data: {
          attributes: {
            url: string
          }
        }
      }
      technologies: string[]
      longDescription: string
      githubUrl: string
      liveUrl: string
    }
  }
  isOpen: boolean
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{project.attributes.title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            <OptimizedImage
              src={`${process.env.NEXT_PUBLIC_API_URL}${project.attributes.image.data.attributes.url}`}
              alt={project.attributes.title}
              width={600}
              height={400}
              className="mb-4 rounded-lg"
            />
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.attributes.longDescription}</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2">
                {project.attributes.technologies.map((tech) => (
                  <span key={tech} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href={project.attributes.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                View on GitHub
              </a>
              <a
                href={project.attributes.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal