import { useScroll } from 'framer-motion'
import { useRef } from 'react'

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  return { ref, scrollYProgress }
}