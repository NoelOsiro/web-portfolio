'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition