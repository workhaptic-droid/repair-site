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
      <div className="w-32 h-32 rounded-full border-2 border-[#00D9FF]/30 animate-pulse" />
    </div>
  )
}

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00D9FF]/30 mb-8"
        >
          <BadgeCheck className="w-4 h-4 text-[#00D9FF]" />
          <span className="text-[#00D9FF] text-sm font-medium">Premium IT Solutions</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-outfit font-black text-4xl sm:text-6xl lg:text-8xl leading-tight mb-6"
        >
          <span className="text-white block">Инженерная точность.</span>
          <span className="gradient-text block mt-2">Цифровое мастерство.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Комплексные IT-решения: от компонентного ремонта электроники до развертывания мобильных серверов и автономных энергосистем.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToServices}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] text-white font-semibold text-base transition-all duration-300 hover:scale-105 hover:glow-cyan w-full sm:w-auto"
          >
            Начать сейчас
          </button>
          <button
            onClick={onLearnMore}
            className="px-8 py-4 rounded-full glass text-white font-semibold text-base transition-all duration-300 hover:scale-105 hover:bg-white/10 w-full sm:w-auto"
          >
            Узнать больше
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}