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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

const lineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

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
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                onClick={onClose}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="liquid-glass-modal rounded-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/80 border-b border-[#00D9FF]/20">
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-red-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-yellow-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-[#00D9FF]/60 text-xs font-mono">terminal.exe</span>
                    <Dialog.Close asChild>
                      <motion.button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors"
                        aria-label="Close terminal"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </Dialog.Close>
                  </div>

                  <div className="p-6 font-mono text-sm sm:text-base">
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={index}
                        variants={lineVariants}
                        initial="hidden"
                        animate={index < visibleLines ? "visible" : "hidden"}
                        className="text-[#00D9FF] mb-2"
                      >
                        {line}
                      </motion.div>
                    ))}
                    {visibleLines >= terminalLines.length && (
                      <motion.div 
                        className="text-[#00D9FF] terminal-cursor mt-4"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
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
