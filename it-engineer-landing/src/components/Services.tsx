import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Smartphone, Headphones, Wrench, Zap, Settings, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Smartphone,
    title: 'Мобильные устройства & Софт',
    description: 'Прошивка, Brick, FRP, Root, кастомные ОС.',
    color: '#00D9FF',
    delay: 0,
  },
  {
    icon: Headphones,
    title: 'Технический консалтинг',
    description: 'Подбор оборудования под задачи, защита от переплат.',
    color: '#9D4EDD',
    delay: 0.1,
  },
  {
    icon: Wrench,
    title: 'Ремонт ПК & Электроники',
    description: 'Модульный/компонентный ремонт, ТО, кастомное охлаждение.',
    color: '#FF006E',
    delay: 0.2,
  },
  {
    icon: Zap,
    title: 'Автономные энергосистемы',
    description: 'Проектирование солнечных станций, PowerBank сборок (Li-ion 18650/21700).',
    color: '#00D9FF',
    delay: 0.3,
  },
  {
    icon: Settings,
    title: 'Системное администрирование',
    description: 'Windows Server/Linux, сети, UI/UX аудит, мобильные серверы.',
    color: '#9D4EDD',
    delay: 0.4,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
} as const

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section id="services" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Полный спектр <span className="gradient-text">IT-решений</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Профессиональные услуги для тех, кто не идет на компромиссы.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.08,
                  y: -8,
                  transition: { duration: 0.4, ease: 'easeOut' }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative premium-liquid-glass rounded-3xl p-6 sm:p-8 overflow-hidden cursor-pointer"
                style={{ borderColor: `${service.color}30` }}
              >
                {/* Enhanced gradient background on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                  style={{ background: `radial-gradient(circle at center, ${service.color}30, transparent 70%)` }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Animated border glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 -z-20"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}20, transparent 50%)`,
                  }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Icon container with liquid glass effect */}
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 premium-liquid-glass relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.color}25, ${service.color}10)`,
                    borderColor: `${service.color}40`
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 360,
                    transition: { duration: 0.6, ease: 'easeInOut' }
                  }}
                >
                  {/* Icon glow background */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${service.color}30, transparent)` }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Icon className="w-7 h-7 relative z-10" style={{ color: service.color }} />
                </motion.div>

                <motion.h3 
                  className="font-outfit font-bold text-xl text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${service.color}, ${service.color}80)`,
                  }}
                  whileHover={{ letterSpacing: '0.05em' }}
                >
                  {service.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {service.description}
                </motion.p>

                <motion.a
                  href="https://t.me/Hacker_Iva_Official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-400 group/link"
                  aria-label={`Заказать услугу: ${service.title}`}
                  style={{ color: service.color }}
                  whileHover={{
                    gap: '12px',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                >
                  <span className="relative">
                    ЗАКАЗАТЬ
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/link:w-full transition-all duration-300"
                      style={{ backgroundColor: service.color }}
                    />
                  </span>
                  <motion.div
                    whileHover={{ x: 6, rotate: 45 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.a>

                {/* Decorative corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${service.color}, transparent)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
