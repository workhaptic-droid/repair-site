import { motion } from 'framer-motion';
import {
  Smartphone,
  Headphones,
  Wrench,
  Zap,
  Settings,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Мобильные устройства & Софт',
    description: 'Прошивка, Brick, FRP, Root',
    color: '#00D9FF',
    gradient: 'from-cyan-400 to-cyan-500',
  },
  {
    icon: Headphones,
    title: 'Технический консалтинг',
    description: 'Подбор под задачи, защита от переплат',
    color: '#9D4EDD',
    gradient: 'from-purple-400 to-purple-500',
  },
  {
    icon: Wrench,
    title: 'Ремонт ПК & Электроники',
    description: 'Модульный ремонт, ТО, модификация',
    color: '#FF006E',
    gradient: 'from-pink-400 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Автономные энергосистемы',
    description: 'Солнечные станции, Li-ion/LiFePO4 PowerBank',
    color: '#00D9FF',
    gradient: 'from-cyan-400 to-cyan-500',
  },
  {
    icon: Settings,
    title: 'Системное администрирование',
    description: 'Windows Server/Linux, сети, UI/UX аудит',
    color: '#9D4EDD',
    gradient: 'from-purple-400 to-purple-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export function Services() {
  return (
    <section id="services" className="relative z-20 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
            Полный спектр{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              IT-решений
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Профессиональные услуги для компаний, которые не идут на компромисс
            в качестве
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 sm:mb-5`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Button */}
                <a
                  href="https://t.me/Hacker_Iva_Official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: `${service.color}15`,
                    color: service.color,
                    border: `1px solid ${service.color}30`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${service.color}25`;
                    e.currentTarget.style.borderColor = `${service.color}50`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${service.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${service.color}15`;
                    e.currentTarget.style.borderColor = `${service.color}30`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ЗАКАЗАТЬ
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
