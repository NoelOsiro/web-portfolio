'use client'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Testimonials from '@/components/Testimonials'
import Image from 'next/image'
import ProjectItem from '@/components/ProjectCard'
import { getBlogPosts } from '@/services/api'
import { Post } from '@/types'
import { urlFor } from '@/sanity/lib/image'


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
  return <motion.section
    className="flex flex-col md:flex-row items-center mb-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="w-full md:w-1/2 mb-6 md:mb-0">
      <motion.img
        src="/images/image.png" // Update with your image path
        alt="A relevant description"
        className="w-full h-auto rounded-lg shadow-lg"
        whileHover={{ scale: 1.05 }} />
    </div>
    <div className="w-full md:w-1/2 text-center md:text-left px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-xl mb-6">I am a software developer specializing in web technologies.</p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Get in Touch
        </Link>
      </motion.div>
    </div>
  </motion.section>
}
function AboutSection() {
  return (<motion.section className="mb-12" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.4
  }}>
    <div className="text-center mb-6 relative">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full transition-all duration-300 ease-in-out group hover:w-32"></div>
    </div>
    <p className="mb-4">
      A passionate developer with a keen interest in creating efficient and scalable web solutions...
    </p>
    <motion.div whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }}>
      <Link href="/about" className="text-blue-500 hover:underline">
        Learn more about me
      </Link>
    </motion.div>
  </motion.section>);
}

function FeaturesSection() {
  const techStack = [
    { src: '/images/image.png', alt: 'Tech 1' },
    { src: '/images/image.png', alt: 'Tech 2' },
    { src: '/images/image.png', alt: 'Tech 3' }
  ];
  return (<motion.section className="mb-12" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.6
  }}>
    <div className="text-center mb-6 relative">
      <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full transition-all duration-300 ease-in-out group hover:w-32"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectItem imageSrc={'/images/image.png'} title={'Project 1'} description={'A brief description of Project 1, highlighting the key features and purpose of the project.'} techStack={techStack} />
      <ProjectItem imageSrc={'/images/image.png'} title={'Project 2'} description={'A brief description of Project 1, highlighting the key features and purpose of the project.'} techStack={techStack} />

    </div>

    <div className="mt-4">
      <motion.div whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
        <Link href="/projects" className="text-blue-500 hover:underline text-lg font-semibold">
          View all projects
        </Link>
      </motion.div>
    </div>
  </motion.section>);
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

