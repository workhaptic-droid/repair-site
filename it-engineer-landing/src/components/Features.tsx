import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Sparkles } from 'lucide-react'

const features = [
  { text: 'Профессиональный подход', icon: Check },
  { text: 'Гарантированное качество', icon: Check },
  { text: '24/7 поддержка', icon: Check },
  { text: 'Инновационные решения', icon: Sparkles },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
} as const

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section className="relative z-10 py-16 sm:py-24 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.text}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.08,
                  y: -4,
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-5 py-3 rounded-full liquid-glass group cursor-pointer relative overflow-hidden"
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-full -z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(157, 78, 221, 0.1))',
                  }}
                  animate={{ 
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />

                {/* Icon */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="flex-shrink-0"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D9FF]" />
                </motion.div>

                {/* Text */}
                <span className="text-white text-sm sm:text-base font-medium whitespace-nowrap group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00D9FF] group-hover:to-[#9D4EDD] transition-all duration-300">
                  {feature.text}
                </span>

                {/* Decorative glow */}
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 opacity-0 group-hover:opacity-20 blur-xl"
                  style={{
                    background: 'radial-gradient(circle, #00D9FF, transparent)',
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
