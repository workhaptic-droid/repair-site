import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { ParticleField } from './ParticleField';
import { RotatingTorus } from './RotatingTorus';
import { MorphingSphere } from './MorphingSphere';
import { FloatingBox } from './FloatingBox';

interface SceneContentProps {
  isLowPerformance: boolean;
}

function SceneContent({ isLowPerformance }: SceneContentProps) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9D4EDD" />
      {!isLowPerformance && (
        <pointLight position={[0, 10, -5]} intensity={0.5} color="#FF006E" />
      )}
      <ParticleField isLowPerformance={isLowPerformance} />
      <RotatingTorus />
      <MorphingSphere isLowPerformance={isLowPerformance} />
      <FloatingBox isLowPerformance={isLowPerformance} />
    </>
  );
}

export function Scene3D() {
  const [dpr, setDpr] = useState<number>(1.5);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  // Плавная адаптация качества: снижаем/повышаем dpr в границах устройства
  const handlePerformanceChange = useCallback(({ factor }: { factor: number }) => {
    const nextDpr = Math.min(2, Math.max(1, 0.5 + 1.5 * factor));
    setDpr(nextDpr);
    setIsLowPerformance(factor < 0.4);
  }, []);

  // Если fps нестабилен (флип-флопы) — фиксируем самый низкий баланс качества
  const handleFallback = useCallback(() => {
    setDpr(1);
    setIsLowPerformance(true);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={dpr}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isLowPerformance, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor
          bounds={() => [30, 58]}
          flipflops={3}
          onChange={handlePerformanceChange}
          onFallback={handleFallback}
        />
        <Suspense fallback={null}>
          <SceneContent isLowPerformance={isLowPerformance} />
        </Suspense>
      </Canvas>
    </div>
  );
}
