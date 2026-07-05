import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative z-20 py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="text-center p-8 sm:p-12 lg:p-16 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
              Готовы начать?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto px-4">
              Свяжитесь с нами сегодня и получите консультацию от
              профессионалов
            </p>

            <motion.a
              href="https://t.me/Hacker_Iva_Official"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full font-bold text-black text-sm sm:text-base lg:text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,217,255,0.4)]"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              Написать в Telegram
              <span className="text-lg sm:text-xl">&#128640;</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
