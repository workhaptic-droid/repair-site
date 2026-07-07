import { useState, useEffect, Component, type ReactNode } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import Stats from './components/Stats'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import TerminalModal from './components/TerminalModal'

// Error Boundary for Three.js crashes
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Error Boundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Что-то пошло не так</h2>
            <p className="text-gray-400 mb-6">Попробуйте обновить страницу или используйте другое устройство.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] text-white font-semibold"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// WebGL detection utility
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    ))
  } catch {
    return false
  }
}

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [webglFailed, setWebglFailed] = useState(false)

  // Check WebGL on mount
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglFailed(true)
    }

    // Listen for WebGL errors from canvas
    const handleWebglError = () => setWebglFailed(true)
    window.addEventListener('webgl-error', handleWebglError)

    return () => {
      window.removeEventListener('webgl-error', handleWebglError)
    }
  }, [])

  if (webglFailed) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="text-center max-w-lg">
            <h1 className="font-outfit font-black text-4xl sm:text-6xl mb-6">
              <span className="text-white">IT Engineer</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Ваш браузер не поддерживает WebGL, необходимый для 3D-эффектов. 
              Сайт работает в ограниченном режиме.
            </p>
            <a
              href="https://t.me/Hacker_Iva_Official"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] text-white font-semibold"
            >
              Связаться в Telegram
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
        <Header />
        <Hero onLearnMore={() => setTerminalOpen(true)} />
        <Features />
        <Services />
        <Stats />
        <CTASection />
        <Footer />
        <TerminalModal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </div>
    </ErrorBoundary>
  )
}

export default App