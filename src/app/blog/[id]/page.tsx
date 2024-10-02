'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getBlogPost } from '@/services/api';
import { notFound, useParams } from 'next/navigation';
import Comments from '@/components/Comments';
import { Post } from '@/types';
import OptimizedImage from '@/components/OptimizedImage';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { TypedObject } from 'sanity';

export default function BlogPost() {
  const params = useParams<{ id: string }>(); // Extracts the blog post ID from the URL params
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<boolean>(false); // Handle errors

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await getBlogPost(params.id);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError(true); // Handle cases where the post is not found
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }

    if (params.id) fetchPost(); // Fetch the post only if ID exists
  }, [params.id]);

  // Show error message if post is not found
  if (error) {
    return notFound();
  }

  // Show loading state while fetching
  if (!post) {
    return <div>Loading...</div>;
  }

  console.log(post);

  return (
    <motion.article
      className="container mx-auto px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <OptimizedImage
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            width={400}
            height={400}
            className="rounded-lg shadow-lg mb-8"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
          <motion.p
            className="text-4xl font-bold mb-8"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {post.title}
          </motion.p>
          <motion.div
            className="text-gray-600 dark:text-gray-400 mb-8 flex items-center" // Add flex for alignment
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {post.author?.image && ( // Check if the image exists
              <Image
                src={urlFor(post.author.image).url()} // Use your existing image URL builder
                alt={post.author.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full mr-2" // Adjust size and add margin
              />
            )}
            <span className="ml-4">
              By {post.author.name} <br /> {post.publishedAt.split('T')[0]}
            </span>
          </motion.div>
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
          value={post.body as TypedObject[]} // Type assertion to let TypeScript know it's an array of Block

        />
      </motion.div>
      <Comments postId={post.id} />
    </motion.article>
  );
}


