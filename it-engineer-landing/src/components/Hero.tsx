import { motion } from 'framer-motion'
import { BadgeCheck, ChevronDown } from 'lucide-react'
import { Suspense, lazy } from 'react'

const Scene3D = lazy(() => import('./Scene3D'))

interface HeroProps {
  onLearnMore: () => void
}

function CanvasFallback() {
  return (
    <div className="canvas-container flex items-center justify-center">
      <motion.div 
        className="w-32 h-32 rounded-full border-2 border-[#00D9FF]/30"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  )
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
} as const

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
} as const

const descriptionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.1,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
} as const

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.2,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
} as const

const scrollIndicatorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 1.5,
    },
  },
}

export default function Hero({ onLearnMore }: HeroProps) {
  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={<CanvasFallback />}>
        <Scene3D />
      </Suspense>

      <div className="content-layer relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-20">
        {/* Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={badgeVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-[#00D9FF]/30 mb-8"
          whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <BadgeCheck className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>
          <span className="text-[#00D9FF] text-sm font-medium">Premium IT Solutions</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="font-outfit font-black text-4xl sm:text-6xl lg:text-8xl leading-tight mb-6"
        >
          <motion.span 
            className="text-white block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Инженерная точность.
          </motion.span>
          <motion.span 
            className="gradient-text block mt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Цифровое мастерство.
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
          className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Комплексные IT-решения: от компонентного ремонта электроники до развертывания мобильных серверов и автономных энергосистем.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={scrollToServices}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] text-white font-semibold text-base liquid-glass-button w-full sm:w-auto overflow-hidden relative group"
            whileHover={{ 
              scale: 1.08,
              boxShadow: '0 0 40px rgba(0, 217, 255, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.span 
              className="relative z-10 flex items-center justify-center gap-2"
              whileHover={{ letterSpacing: '0.05em' }}
            >
              Начать сейчас
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </motion.div>
            </motion.span>
            
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(157, 78, 221, 0.2))',
              }}
              animate={{ 
                opacity: [0, 0.5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={onLearnMore}
            className="px-8 py-4 rounded-full liquid-glass text-white font-semibold text-base w-full sm:w-auto group relative overflow-hidden"
            whileHover={{ 
              scale: 1.08,
              boxShadow: '0 0 30px rgba(157, 78, 221, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.span 
              className="relative z-10"
              whileHover={{ letterSpacing: '0.02em' }}
            >
              Узнать больше
            </motion.span>
            
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(255, 0, 110, 0.1))',
              }}
              animate={{ 
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={scrollIndicatorVariants}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToServices}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          whileHover={{ y: 5 }}
        >
          <span className="text-xs text-gray-400 font-medium group-hover:text-[#00D9FF] transition-colors">
            Прокрутить
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2 liquid-glass group-hover:border-[#00D9FF]/50 transition-colors"
          >
            <motion.div 
              className="w-1 h-2 bg-white/60 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[#00D9FF]/10 rounded-full blur-3xl opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-[#9D4EDD]/10 rounded-full blur-3xl opacity-20"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />
    </section>
  )
}
