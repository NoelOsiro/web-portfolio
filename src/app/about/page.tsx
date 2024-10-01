'use client'

import { motion } from 'framer-motion';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useTheme } from '@/components/ThemeProvider';
import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'GraphQL', level: 70 },
  { name: 'Python', level: 65 },
];

const careerHistory = [
  {
    id: 1,
    title: 'ICT Specialist',
    company: 'Q3M Wanda Solutions.',
    period: '2024 - Present',
    description: 'Leading ICT projects and managing a team of developers.',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'ALX Africa',
    period: '2021 - 2022',
    description: 'Developed and maintained various web applications using MERN stack.',
  },
  {
    id: 3,
    title: 'Manual QA Tester',
    company: 'Crossover.com',
    period: '2022 - 2022',
    description: 'Tested web applications and reported bugs to the development team.',
  },
];

const certifications = [
  {
    id: 1,
    name: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    certificate: '2023', // Corrected capitalization to match the convention
    date: '2022',
  },
  {
    id: 2,
    name: 'AWS Certified Cloud Practitioner (CCP)',
    issuer: 'Amazon Web Services',
    certificate: '2023',
    date: '2021',
  },
  {
    id: 3,
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    certificate: 'AZ-900',
    date: '2021',
  },
];


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
];



const chartOptions = {
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

export default function About() {
  const { theme } = useTheme();
  const chartData = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: skills.map(skill => skill.level),
        backgroundColor: theme === 'dark' ? 'rgba(236, 236, 236, 0)' : 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
    ],
  };
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
            I am a passionate software developer with a focus on web technologies. My journey in the world of programming began in 2016 when I first discovered the power of creating things with code.
          </p>
          <p className="mb-4">
            Since then, I have worked on a variety of projects, from small websites to large-scale applications, always striving to learn and improve my skills.
          </p>

          <div style={{ padding: '20px', background: theme=== 'dark' ? '#333' : '#fff' }}>
      <h2>Skills</h2>
      {skills.map((skill) => (
        <div key={skill.name} style={{ margin: '10px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
          <ProgressBar value={skill.level} />
        </div>
      ))}
    </div>
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
    className={`p-4 rounded-lg ${
      cert.issuer === 'Amazon Web Services'
        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700'
        : 'bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700'
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <div className="flex items-center space-x-4">
      {/* Icon for each issuer */}
      {cert.issuer === 'Amazon Web Services' && (
        <Image src="/icons/aws-icon.jpeg" width={40} height={40} alt="AWS Icon" className="w-10 h-10" />
      )}
      {cert.issuer === 'Microsoft' && (
        <Image src="/icons/azure-icon.jpeg" width={40} height={40} alt="Microsoft Icon" className="w-10 h-10" />
      )}

      <div>
        <h4 className="font-semibold text-white">{cert.name}</h4>
        <p className="text-sm text-white">
          {cert.issuer} | {cert.date}
        </p>
      </div>
    </div>
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
        <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
        <p>If you&apos;d like to get in touch, feel free to reach out!</p>
      </motion.div>
    </div>
  );
}
