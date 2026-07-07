import { motion, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'

interface CounterProps {
  target: number
  suffix?: string
  isInView: boolean
}

function Counter({ target, suffix = '', isInView }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)

  const startAnimation = useCallback(() => {
    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.stop()
    }

    animationRef.current = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest))
      },
    })
  }, [target])

  useEffect(() => {
    if (isInView) {
      startAnimation()
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [isInView, startAnimation])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 500, suffix: '+', label: 'Проектов выполнено' },
  { value: 99, suffix: '%', label: 'Удовлетворенность' },
  { value: 15, suffix: '+', label: 'Лет опыта' },
  { value: 24, suffix: '/7', label: 'Техническая поддержка' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
} as const

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative z-10 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl gradient-text mb-2">
                <Counter target={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
