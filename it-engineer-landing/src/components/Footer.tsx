import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export default function Footer() {
  return (
    <motion.footer 
      className="relative z-10 py-8 border-t border-white/10 liquid-glass"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 IT Engineer. Все права защищены.
          </p>
          <motion.a
            href="https://t.me/Hacker_Iva_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#00D9FF] hover:text-white transition-colors text-sm"
            whileHover={{ gap: '12px', scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Send className="w-4 h-4" />
            </motion.div>
            Telegram
          </motion.a>
        </div>
      </div>
    </motion.footer>
  )
}
