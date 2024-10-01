import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO, TechCorp',
    content: 'Working with this developer was an absolute pleasure. Their technical skills and attention to detail resulted in a product that exceeded our expectations.',
    avatar: '/images/image.png',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO, InnovateTech',
    content: 'I was impressed by the developer\'s ability to quickly grasp complex concepts and deliver elegant solutions. They are a valuable asset to any team.',
    avatar: '/images/image.png',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    role: 'Project Manager, WebSolutions',
    content: 'The developer\'s commitment to quality and timely delivery made our project a success. I highly recommend their services.',
    avatar: '/images/image.png',
  },
]

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials