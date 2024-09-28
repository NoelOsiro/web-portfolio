'use client'

import { motion } from 'framer-motion'
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'GraphQL', level: 70 },
  { name: 'Python', level: 65 },
]

const careerHistory = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Innovators Inc.',
    period: '2021 - Present',
    description: 'Leading development of cutting-edge web applications using React and Node.js.',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2018 - 2021',
    description: 'Developed and maintained various web applications using MERN stack.',
  },
  {
    id: 3,
    title: 'Junior Web Developer',
    company: 'WebCraft Agency',
    period: '2016 - 2018',
    description: 'Started career working on front-end development using HTML, CSS, and JavaScript.',
  },
]

const certifications = [
  {
    id: 1,
    name: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    date: '2022',
  },
  {
    id: 2,
    name: 'React Native Specialist',
    issuer: 'Udacity',
    date: '2021',
  },
  {
    id: 3,
    name: 'Google Cloud Certified - Professional Cloud Architect',
    issuer: 'Google Cloud',
    date: '2020',
  },
]

const awards = [
  {
    id: 1,
    name: 'Best Web Application',
    issuer: 'TechCrunch Disrupt',
    date: '2023',
  },
  {
    id: 2,
    name: 'Outstanding Contribution to Open Source',
    issuer: 'GitHub',
    date: '2022',
  },
]

const chartData = {
  labels: skills.map(skill => skill.name),
  datasets: [
    {
      label: 'Skill Level',
      data: skills.map(skill => skill.level),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }
  ]
}

const chartOptions = {
  scales: {
    r: {
      angleLines: {
        display: false
      },
      suggestedMin: 0,
      suggestedMax: 100
    }
  }
}

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
            I'm a passionate software developer with a focus on web technologies. My journey in the world of programming began in 2016 when I first discovered the power of creating things with code.
          </p>
          <p className="mb-4">
            Since then, I've worked on a variety of projects, from small websites to large-scale applications, always striving to learn and improve my skills.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Radar data={chartData} options={chartOptions} />
          </motion.div>
        </div>
      </motion.div>
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Career Timeline</h2>
        <div className="relative border-l-2 border-gray-300 dark:border-gray-700 ml-3">
          {careerHistory.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="mb-8 flex"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.company} | {item.period}</p>
                <p className="mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Certifications & Awards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Certifications</h3>
            <ul className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.li 
                  key={cert.id}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer} | {cert.date}</p>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Awards</h3>
            <ul className="space-y-4">
              {awards.map((award, index) => (
                <motion.li 
                  key={award.id}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h4 className="font-semibold">{award.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{award.issuer} | {award.date}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">My Approach</h2>
        <p className="mb-4">
          I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices. My goal is to create efficient, scalable solutions that solve real-world problems.
        </p>
        <p>
          When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, and sharing my knowledge through blog posts and tech talks.
        </p>
      </motion.div>
    </div>
  )
}