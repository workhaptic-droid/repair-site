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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-4">
            Полный спектр <span className="gradient-text">IT-решений</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Профессиональные услуги для тех, кто не идет на компромиссы.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative glass rounded-2xl p-6 sm:p-8 transition-all duration-300"
                style={{ borderColor: `${service.color}30` }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                  style={{ background: `radial-gradient(circle at center, ${service.color}20, transparent 70%)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>

                <h3 className="font-outfit font-bold text-xl text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <a
                  href="https://t.me/Hacker_Iva_Official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3" aria-label={`Заказать услугу: ${service.title}`}
                  style={{ color: service.color }}
                >
                  ЗАКАЗАТЬ
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}