import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingBoxProps {
  isLowPerformance?: boolean;
}

export function FloatingBox({ isLowPerformance = false }: FloatingBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 1.5) * 0.5 + 0.5;
    meshRef.current.rotation.x = time * 0.4;
    meshRef.current.rotation.y = time * 0.6;
  });

  return (
    <mesh ref={meshRef} position={[0, 2, -3]}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive={isLowPerformance ? '#000000' : '#00D9FF'}
        emissiveIntensity={isLowPerformance ? 0 : 0.4}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
