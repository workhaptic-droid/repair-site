import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'liquid-glass-modal'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#00D9FF]" />
              </motion.div>
              <motion.div 
                className="absolute inset-0 blur-lg bg-[#00D9FF]/50 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-white text-sm sm:text-base leading-tight">
                IT Engineer
              </span>
              <span className="text-[#00D9FF] text-[10px] sm:text-xs font-medium leading-tight hidden sm:block">
                Professional Solutions
              </span>
            </div>
          </motion.div>

          <motion.a
            href="https://t.me/Hacker_Iva_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] text-white font-semibold text-xs sm:text-sm liquid-glass-button overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="hidden sm:inline">TELEGRAM</span>
            <span className="sm:hidden">TG</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}
