import { motion } from 'framer-motion'

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
            I&apos;m a passionate software developer with a focus on web technologies. My journey in the world of programming began [Your Start Year] when I first discovered the power of creating things with code.
          </p>
          <p className="mb-4">
            Since then, I&apos;ve worked on a variety of projects, from small websites to large-scale applications, always striving to learn and improve my skills.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>JavaScript / TypeScript</li>
            <li>React.js / Next.js</li>
            <li>Node.js / Express.js</li>
            <li>HTML5 / CSS3 / Tailwind CSS</li>
            <li>SQL / NoSQL Databases</li>
            <li>Git / Version Control</li>
            <li>RESTful APIs / GraphQL</li>
            <li>Test-Driven Development</li>
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
          When I am not coding, you can find me [Your Hobbies or Interests]. I am always excited to take on new challenges and collaborate on interesting projects.
        </p>
      </motion.div>
    </div>
  )
}