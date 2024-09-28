'use client'

import { motion } from 'framer-motion'

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'GraphQL', level: 70 },
  { name: 'Python', level: 65 },
]

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Journey</h2>
          <p className="mb-4">
            I am a passionate software developer with a focus on web technologies. My journey in the world of programming began [Your Start Year] when I first discovered the power of creating things with code.
          </p>
          <p className="mb-4">
            Since then, I&apos;ve worked on a variety of projects, from small websites to large-scale applications, always striving to learn and improve my skills.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
          <ul className="space-y-4">
            {skills.map((skill, index) => (
              <motion.li 
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <motion.div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  ></motion.div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">My Approach</h2>
        <p className="mb-4">
          I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices. My goal is to create efficient, scalable solutions that solve real-world problems.
        </p>
        <p>
          When I&apos;m not coding, you can find me [Your Hobbies or Interests]. I am always excited to take on new challenges and collaborate on interesting projects.
        </p>
      </motion.div>
    </div>
  )
}