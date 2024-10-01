import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectItemProps {
    imageSrc: string;
    title: string;
    description: string;
    techStack: { src: string; alt: string }[];
    }

function ProjectItem({ imageSrc, title, description, techStack }: ProjectItemProps) {
  return (
    <motion.div 
      className="border p-4 rounded-lg shadow-lg" 
      whileHover={{ scale: 1.05 }} 
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Project Image */}
      <Image 
        src={imageSrc} 
        alt={title} 
        height={192} 
        width={320} 
        className="w-full h-48 object-cover rounded-t-lg mb-4" 
      />

      {/* Project Title */}
      <h3 className="font-bold text-lg mb-2">{title}</h3>

      {/* Project Description */}
      <p className="mb-4">{description}</p>

      {/* Tech Stack Icons */}
      <div className="flex space-x-4 items-center">
        {techStack.map((tech, index) => (
          <Image key={index} src={tech.src} alt={tech.alt} width={32} height={32} className="w-8 h-8" />
        ))}
      </div>
    </motion.div>
  );
}

export default ProjectItem;
