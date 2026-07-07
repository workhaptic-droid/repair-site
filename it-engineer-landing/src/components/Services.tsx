import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Smartphone, Headphones, Wrench, Zap, Settings, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Smartphone,
    title: 'Мобильные устройства & Софт',
    description: 'Прошивка, Brick, FRP, Root, кастомные ОС.',
    color: '#00D9FF',
  },
  {
    icon: Headphones,
    title: 'Технический консалтинг',
    description: 'Подбор оборудования под задачи, защита от переплат.',
    color: '#9D4EDD',
  },
  {
    icon: Wrench,
    title: 'Ремонт ПК & Электроники',
    description: 'Модульный/компонентный ремонт, ТО, кастомное охлаждение.',
    color: '#FF006E',
  },
  {
    icon: Zap,
    title: 'Автономные энергосистемы',
    description: 'Проектирование солнечных станций, PowerBank сборок (Li-ion 18650/21700).',
    color: '#00D9FF',
  },
  {
    icon: Settings,
    title: 'Системное администрирование',
    description: 'Windows Server/Linux, сети, UI/UX аудит, мобильные серверы.',
    color: '#9D4EDD',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
} as const

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative z-10 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="text-center mb-16"
        >
          <h2 className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-4">
            Полный спектр <span className="gradient-text">IT-решений</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Профессиональные услуги для тех, кто не идет на компромиссы.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  scale: 1.05,
                  transition: { duration: 0.4, ease: 'easeInOut' }
                }}
                className="group relative liquid-glass rounded-2xl p-6 sm:p-8 overflow-hidden"
                style={{ borderColor: `${service.color}30` }}
              >
                {/* Animated gradient background on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{ background: `radial-gradient(circle at center, ${service.color}20, transparent 70%)` }}
                />

                {/* Icon container with liquid glass effect */}
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 liquid-glass"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                    borderColor: `${service.color}30`
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </motion.div>

                <h3 className="font-outfit font-bold text-xl text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <motion.a
                  href="https://t.me/Hacker_Iva_Official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-400"
                  aria-label={`Заказать услугу: ${service.title}`}
                  style={{ color: service.color }}
                  whileHover={{
                    gap: '12px',
                    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                  }}
                >
                  ЗАКАЗАТЬ
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
