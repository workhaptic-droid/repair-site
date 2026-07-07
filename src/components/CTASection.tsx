import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send } from 'lucide-react'

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative z-10 py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-6">
            Готовы <span className="gradient-text">начать?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Получите консультацию от профессионала.
          </p>
          <motion.a
            href="https://t.me/Hacker_Iva_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#00D9FF] via-[#9D4EDD] to-[#FF006E] text-white font-bold text-lg liquid-glass-button overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
            <span>Написать в Telegram</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
