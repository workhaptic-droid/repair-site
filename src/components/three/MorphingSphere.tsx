import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MorphingSphereProps {
  isLowPerformance?: boolean;
}

export function MorphingSphere({ isLowPerformance = false }: MorphingSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const segments = isLowPerformance ? 24 : 64;
    const geo = new THREE.SphereGeometry(1.2, segments, segments);
    originalPositions.current = new Float32Array(
      geo.attributes.position.array
    );
    return geo;
  }, [isLowPerformance]);

  useFrame((state) => {
    if (!meshRef.current || !originalPositions.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttribute = meshRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions.current[i];
      const y = originalPositions.current[i + 1];
      const z = originalPositions.current[i + 2];

      const noise =
        Math.sin(x * 3 + time * 2) *
        Math.cos(y * 3 + time * 1.5) *
        Math.sin(z * 3 + time);

      const scale = 1 + noise * 0.15;
      positions[i] = x * scale;
      positions[i + 1] = y * scale;
      positions[i + 2] = z * scale;
    }

    positionAttribute.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.2;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[3, -1, -1]}>
      <meshStandardMaterial
        color="#9D4EDD"
        emissive={isLowPerformance ? '#000000' : '#FF006E'}
        emissiveIntensity={isLowPerformance ? 0 : 0.3}
        roughness={0.3}
        metalness={0.7}
        transparent
        opacity={0.85}
        wireframe={false}
      />
    </mesh>
  );
}
