'use client'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Testimonials from '@/components/Testimonials'
import Image from 'next/image'
import ProjectItem from '@/components/ProjectCard'
import { getBlogPosts, getProjects } from '@/services/api'
import { Post, Project } from '@/types'
import { urlFor } from '@/sanity/lib/image'


export default function Home() {

  
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="container mx-auto px-8 py-12"
    >
      <HeaderSection />
      <AboutSection />
      <FeaturesSection />
      <BlogPosts />
      <Testimonials />
    </motion.div>
  )
}


function HeaderSection() {
  return (
    <motion.section
      className="flex flex-col-reverse lg:flex-row items-center mb-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Text Section */}
      <div className="w-full lg:w-2/3 text-center lg:text-left px-4 mt-6 lg:mt-0">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 lg:mb-4 text-gray-800 dark:text-gray-100">
          Software Engineer,
        </h1>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 lg:mb-4">
          Cloud Developer,
        </h1>
        <p className="text-base sm:text-lg lg:text-xl mb-4 lg:mb-6">
          I am a passionate software developer with expertise in modern web technologies. I build robust, scalable, and user-friendly applications, focusing on creating exceptional digital experiences.
        </p>
        <p className="text-sm sm:text-lg lg:text-lg mb-8 lg:mb-6">
          With a strong foundation in JavaScript frameworks, TypeScript, and responsive design, I thrive in both front-end and back-end development. Whether you are looking for a collaborative partner or a solution to a challenging project, I am here to help you achieve your goals.
        </p>

        {/* Call to Action Button */}
        <motion.div
          className="mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg">
            Let’s Build Together
          </Link>
        </motion.div>
      </div> 

      {/* Image Section */}
      <motion.div className="w-full lg:w-1/3 mb-6 lg:mb-0" whileHover={{ scale: 1.05 }}>
        <Image
          src="/images/prof.jpg" // Update with your image path
          alt="Profile picture"
          className="w-full h-auto max-w-sm mx-auto lg:mx-0 rounded-lg shadow-lg " 
          width={600}
          height={400}          
        />
      </motion.div>
    </motion.section>
  )
}

function AboutSection() {
  return (
    <motion.section
      className="mb-12 px-6 py-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Header with underline */}
      <div className="text-center mb-6 relative">
        <h2 className="text-3xl font-bold mb-4 ">
          About Me
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full transition-all duration-300 ease-in-out group hover:w-32"></div>
      </div>

      {/* Description */}
      <p className="mb-4 text-lg leading-relaxed text-center px-8">
        I am a passionate software developer with a deep interest in crafting efficient and scalable web solutions. My experience spans across a range of technologies, from front-end frameworks like React and Next.js to back-end services with Node.js and databases like Supabase.
      </p>
      <p className="mb-6 text-lg leading-relaxed text-center px-8">
        Whether it&apos;s designing seamless user interfaces or building robust APIs, I am committed to delivering high-quality, performant applications. I enjoy tackling challenges head-on and continuously learning to keep up with the ever-evolving tech landscape.
      </p>

      {/* Call to action */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-center"
      >
        <Link href="/about" className="text-blue-600 hover:underline font-bold">
            Learn more about me

        </Link>
      </motion.div>
    </motion.section>
  );
}


function FeaturesSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch projects from Sanity on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="text-center mb-6 relative">
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full transition-all duration-300 ease-in-out group hover:w-32"></div>
      </div>

      {/* Render the projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectItem
            key={project._id}
            projectId={project._id}
            imageSrc={project.imageUrl}
            title={project.title}
            description={project.description}
            // techStack={project.technologies.map((tech) => ({ src: '/path-to-icons/' + tech, alt: tech }))}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/projects" className="text-blue-500 hover:underline text-lg font-semibold">

              View all projects

          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}


function BlogCard({ post }:{ post: Post }) {
  return (
    <motion.div
      className="border p-4 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Image
        src={urlFor(post.mainImage).url()}// Assuming post has an imageUrl property
        alt={post.title} // Assuming post has a title property
        width={640}
        height={360}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h3 className="font-bold text-lg mb-2">{post.title}</h3>
      <p className="mb-4">{post.description}</p>
      <div className="flex space-x-2 items-center">
        {/* {post.categories.map((category, index) => (
          <span key={index} className={`text-xs bg-${category.color}-100 text-${category.color}-500 py-1 px-2 rounded`}>
            {category.name}
          </span>
        ))} */}
      </div>
    </motion.div>
  );
}

function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(''); // For error handling

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await getBlogPosts('');
        setPosts(fetchedPosts);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch posts.'); // Set error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="text-center mb-8 relative">
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full transition-all duration-300 ease-in-out group hover:w-32"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading && <p>Loading...</p>} {/* Loading indicator */}
        {error && <p className="text-red-500">{error}</p>} {/* Error message */}
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} /> // Dynamically rendering BlogCards
        ))}
      </div>
      <div className="mt-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/blog" className="text-blue-500 hover:underline">Read all blog posts</Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

