import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface TerminalModalProps {
  open: boolean
  onClose: () => void
}

const terminalLines = [
  '> Host: MAR-LX1A | OS: Android / Termux Core',
  '> System: Windows Server / Linux Environment',
  '> Power: Солнечная станция 56W | Li-ion Buck-boost',
  '> Status: Онлайн | Защита: Активна',
  '> Услуги: Ремонт, Прошивка, Серверы, Энергосистемы',
]

export default function TerminalModal({ open, onClose }: TerminalModalProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTyping = useCallback(() => {
    setVisibleLines(0)
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    intervalRef.current = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          return prev + 1
        }
        return prev + 1
      })
    }, 400)
  }, [])

  useEffect(() => {
    if (open) {
      startTyping()
    } else {
      setVisibleLines(0)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [open, startTyping])

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                onClick={onClose}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-black border border-[#00D9FF]/30 rounded-xl overflow-hidden shadow-2xl glow-cyan">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-[#00D9FF]/20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[#00D9FF]/60 text-xs font-mono">terminal.exe</span>
                    <Dialog.Close asChild>
                      <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors"
                        aria-label="Close terminal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="p-6 font-mono text-sm sm:text-base">
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={index < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#00D9FF] mb-2"
                      >
                        {line}
                      </motion.div>
                    ))}
                    {visibleLines >= terminalLines.length && (
                      <div className="text-[#00D9FF] terminal-cursor mt-4" />
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}