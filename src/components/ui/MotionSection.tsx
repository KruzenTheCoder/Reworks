'use client'

import { motion } from 'framer-motion'

type Variant = 'fadeUp' | 'fade' | 'slideLeft' | 'slideRight' | 'zoom'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  variant?: Variant
  delay?: number
}

export default function MotionSection({ children, className, variant = 'fadeUp', delay = 0 }: MotionSectionProps) {
  const getInitial = () => {
    switch (variant) {
      case 'fadeUp':
        return { opacity: 0, y: 24 }
      case 'fade':
        return { opacity: 0 }
      case 'slideLeft':
        return { opacity: 0, x: -24 }
      case 'slideRight':
        return { opacity: 0, x: 24 }
      case 'zoom':
        return { opacity: 0, scale: 0.95 }
      default:
        return { opacity: 0, y: 24 }
    }
  }

  const getAnimate = () => {
    switch (variant) {
      case 'fadeUp':
        return { opacity: 1, y: 0 }
      case 'fade':
        return { opacity: 1 }
      case 'slideLeft':
        return { opacity: 1, x: 0 }
      case 'slideRight':
        return { opacity: 1, x: 0 }
      case 'zoom':
        return { opacity: 1, scale: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.section
      initial={getInitial()}
      whileInView={getAnimate()}
      transition={{ duration: 0.75, ease: 'easeInOut', delay }}
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
