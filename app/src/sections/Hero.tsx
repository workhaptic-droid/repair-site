import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scene3D } from '@/components/three';
import { ServerInfoModal } from '@/components/ServerInfoModal';

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Background */}
        <Scene3D />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] z-10 pointer-events-none" />

        {/* Content */}
        <motion.div
          style={{ opacity, scale }}
          className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm mb-6 sm:mb-8"
          >
            <span className="text-cyan-400 text-sm sm:text-base">
              &#10024; Premium IT Solutions
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-4 sm:mb-6"
          >
            <span className="text-white block">Инженерная точность.</span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Цифровое мастерство.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
          >
            Профессиональные IT-услуги мирового уровня. От мобильных устройств
            до автономных энергосистем — решаем задачи любой сложности с
            инженерной точностью.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full font-semibold text-black text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:scale-105 active:scale-95"
            >
              Начать сейчас &rarr;
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95"
            >
              Узнать больше
            </button>
          </motion.div>
        </motion.div>
      </section>

      <ServerInfoModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
