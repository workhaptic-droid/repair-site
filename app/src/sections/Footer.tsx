import { Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            &copy; 2026 IT Engineer. Все права защищены. | Designed by Premium
            Design System
          </p>

          {/* Telegram Button */}
          <a
            href="https://t.me/Hacker_Iva_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full font-semibold text-black text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:scale-105 active:scale-95"
          >
            <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            TELEGRAM
          </a>
        </div>
      </div>
    </footer>
  );
}
