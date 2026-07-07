import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
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
      duration: 0.6,
    },
  },
} as const

const titleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
} as const

const descriptionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
} as const

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
} as const

export default function Hero({ onLearnMore }: HeroProps) {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={<CanvasFallback />}>
        <Scene3D />
      </Suspense>

      <div className="content-layer relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={badgeVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-[#00D9FF]/30 mb-8"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <BadgeCheck className="w-4 h-4 text-[#00D9FF]" />
          </motion.div>
          <span className="text-[#00D9FF] text-sm font-medium">Premium IT Solutions</span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="font-outfit font-black text-4xl sm:text-6xl lg:text-8xl leading-tight mb-6"
        >
          <span className="text-white block">Инженерная точность.</span>
          <motion.span 
            className="gradient-text block mt-2"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Цифровое мастерство.
          </motion.span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
          className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Комплексные IT-решения: от компонентного ремонта электроники до развертывания мобильных серверов и автономных энергосистем.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToServices}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] text-white font-semibold text-base liquid-glass-button w-full sm:w-auto overflow-hidden relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <span className="relative z-10">Начать сейчас</span>
          </motion.button>
          <motion.button
            onClick={onLearnMore}
            className="px-8 py-4 rounded-full liquid-glass text-white font-semibold text-base w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            Узнать больше
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2 liquid-glass"
        >
          <motion.div 
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
