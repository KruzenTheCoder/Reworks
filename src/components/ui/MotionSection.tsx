'use client'

import { motion } from 'framer-motion'

type Variant = 'fadeUp' | 'fade' | 'slideLeft' | 'slideRight' | 'zoom'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  variant?: Variant
  delay?: number
  // Viewport controls for in-view triggering
  viewportOnce?: boolean
  viewportAmount?: number
  viewportMargin?: string
}

export default function MotionSection({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  viewportOnce = true,
  viewportAmount = 0,
  viewportMargin = '0px'
}: MotionSectionProps) {
  // Adjust viewport settings for small screens to ensure animations trigger reliably
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const effectiveViewport = {
    once: viewportOnce,
    amount: isMobile ? 0 : viewportAmount,
    margin: isMobile ? '0px' : viewportMargin,
  }

  const getInitial = () => {
    // Simplified for "buttery smooth" performance - mostly just fade or small y-shift
    if (prefersReduced) {
      return { opacity: 0 }
    }
    switch (variant) {
      case 'fadeUp':
        return { opacity: 0, y: 15 } // Reduced travel
      case 'fade':
        return { opacity: 0 }
      case 'slideLeft':
        return { opacity: 0, x: -15 } // Reduced travel
      case 'slideRight':
        return { opacity: 0, x: 15 } // Reduced travel
      case 'zoom':
        return { opacity: 0, scale: 0.98 } // Reduced scale change
      default:
        return { opacity: 0, y: 15 }
    }
  }

  const getAnimate = () => {
    if (prefersReduced) {
      return { opacity: 1 }
    }
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
      transition={{ duration: prefersReduced ? 0.4 : 0.6, ease: 'easeOut', delay }}
      viewport={effectiveViewport}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.section>
  )
}
