import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-black/40 border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 blur-lg opacity-50" />
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-bold text-lg sm:text-xl tracking-tight">
              IT Engineer
            </span>
            <span className="block text-cyan-400 text-xs sm:text-sm font-medium">
              Professional Solutions
            </span>
          </div>
        </div>

        {/* Telegram Button */}
        <a
          href="https://t.me/Hacker_Iva_Official"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full font-semibold text-black text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:scale-105 active:scale-95"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">TELEGRAM</span>
          <span className="sm:hidden">TG</span>
        </a>
      </div>
    </motion.header>
  );
}
