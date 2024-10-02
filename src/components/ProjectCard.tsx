import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlFor } from '@/sanity/lib/image';
import { useRouter } from 'next/navigation';

interface ProjectItemProps {
  projectId: string;
  imageSrc: string;
  title: string;
  description: string;
  // techStack: { src: string; alt: string }[];
}

export default function ProjectItem({ imageSrc, title, description,projectId }: ProjectItemProps) {
  const router = useRouter();
  return (
    <motion.div
      className="border p-4 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={() => {
        router.push(`/projects/${projectId}`);
      }}
    >
      {/* Project Image */}
      <Image src={urlFor(imageSrc).url()} alt={title} width={192} height={192} className="w-full h-48 object-cover rounded-t-lg mb-4" />

      {/* Project Title */}
      <h3 className="font-bold text-lg mb-2">{title}</h3>

      {/* Project Description */}
      <p className="mb-4">{description}</p>

       {/* Button to route to project */}
       <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the parent div click event
          router.push(`/projects/${projectId}`);
        }}
        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        View Project
      </button>
    </motion.div>
  );
}

