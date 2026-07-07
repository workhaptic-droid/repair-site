import { Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 IT Engineer. Все права защищены.
          </p>
          <a
            href="https://t.me/Hacker_Iva_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#00D9FF] hover:text-white transition-colors text-sm"
          >
            <Send className="w-4 h-4" />
            Telegram
          </a>
        </div>
      </div>
    </footer>
  )
}