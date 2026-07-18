import { useRef, useMemo, useEffect, SyntheticEvent } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.62; colors[i * 3 + 1] = 0.31; colors[i * 3 + 2] = 0.87
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0.43
      }
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        vertexColors
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.8}
      />
    </Points>
  )
}

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={ref} position={[-3, 1, -5]}>
      <torusGeometry args={[1.5, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geoRef = useRef<THREE.SphereGeometry | null>(null)
  const originalPositions = useRef<Float32Array | null>(null)

  // Clone geometry on mount to avoid mutating shared instance
  useEffect(() => {
    if (meshRef.current && !geoRef.current) {
      const originalGeo = meshRef.current.geometry as THREE.SphereGeometry
      geoRef.current = originalGeo.clone()
      meshRef.current.geometry = geoRef.current
      originalPositions.current = new Float32Array(geoRef.current.attributes.position.array as Float32Array)
    }

    return () => {
      if (geoRef.current) {
        geoRef.current.dispose()
        geoRef.current = null
      }
    }
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !geoRef.current || !originalPositions.current) return

    // Explicitly assert that position and originalPositions exist to satisfy strict TS
    const pos = geoRef.current.attributes.position!
    const time = state.clock.elapsedTime
    const arr = pos.array as Float32Array
    const orig = originalPositions.current!

    for (let i = 0; i < arr.length; i += 3) {
      const noise = Math.sin(orig[i] * 2 + time) * Math.cos(orig[i + 1] * 2 + time * 0.5) * 0.15
      arr[i] = orig[i] + orig[i] * noise
      arr[i + 1] = orig[i + 1] + orig[i + 1] * noise
      arr[i + 2] = orig[i + 2] + orig[i + 2] * noise
    }

    pos.needsUpdate = true
    meshRef.current.rotation.y = time * 0.1
  })

  return (
    <mesh ref={meshRef} position={[3, -1, -6]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        color="#9D4EDD"
        emissive="#FF006E"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

function FloatingCube() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
      ref.current.position.y = 2 + Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <mesh ref={ref} position={[0, 2, -4]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF006E" />
      <ParticleField />
      <RotatingTorus />
      <MorphingSphere />
      <FloatingCube />
    </>
  )
}

export default function Scene3D() {
  // Fix: DOM events in React use SyntheticEvent, not Error objects
  const handleError = (event: SyntheticEvent<HTMLDivElement, Event>) => {
    console.error('WebGL/Three.js error:', event)
    window.dispatchEvent(new CustomEvent('webgl-error', { detail: event }))
  }

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050505', 0)
        }}
        onError={handleError}
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-[#00D9FF]/30 animate-pulse" />
          </div>
        }
      >
        <Scene />
      </Canvas>
    </div>
  )
}
