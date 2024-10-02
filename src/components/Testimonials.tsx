import { motion } from 'framer-motion'
import Image from 'next/image'

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


const Testimonials = () => {
  return (
    <motion.section className="my-12 px-6 py-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}>

      {/* Header with underline */}
      <div className="text-center mb-6 relative">
        <h2 className="text-3xl font-bold mb-4 ">
          Certifications & Awards
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full transition-all duration-300 ease-in-out group hover:w-32"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Certifications</h3>
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.li
                    key={cert.id}
                    className={`p-4 flex rounded-lg h-32 ${cert.issuer === 'Amazon Web Services'
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
                        <h4 className="font-semibold ">{cert.name}</h4>
                        <p className="text-sm ">
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
      </div>
    </motion.section>
  )
}

export default Testimonials

