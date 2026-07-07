import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'

const features = [
  'Профессиональный подход',
  'Гарантированное качество',
  '24/7 поддержка',
  'Инновационные решения',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
} as const

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative z-10 py-16 sm:py-20 bg-gradient-to-b from-transparent to-[#050505]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 sm:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Check className="w-4 h-4 text-[#00D9FF]" />
              </motion.div>
              <span className="text-white text-sm sm:text-base font-medium">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
