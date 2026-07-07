import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative z-10 py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-6">
            Готовы <span className="gradient-text">начать?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Получите консультацию от профессионала.
          </p>
          <a
            href="https://t.me/Hacker_Iva_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#00D9FF] via-[#9D4EDD] to-[#FF006E] text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:glow-cyan"
          >
            <Send className="w-5 h-5" />
            Написать в Telegram
          </a>
        </motion.div>
      </div>
    </section>
  )
}