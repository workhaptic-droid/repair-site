import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Advanced Particle Field with dynamic colors and physics
function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const velocityRef = useRef<Float32Array | null>(null)

  const particles = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    const colorPalette = [
      { r: 0, g: 0.85, b: 1 },      // Cyan
      { r: 0.62, g: 0.31, b: 0.87 }, // Purple
      { r: 1, g: 0, b: 0.43 },       // Pink
      { r: 0.2, g: 1, b: 0.8 },      // Teal
      { r: 1, g: 0.5, b: 0 },        // Orange
    ]

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 25
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      if (color) {
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }

      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    velocityRef.current = velocities
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current && velocityRef.current) {
      const posAttr = ref.current.geometry.attributes.position
      if (!posAttr || !posAttr.array) return
      const positions = posAttr.array as Float32Array
      const velocities = velocityRef.current
      
      for (let i = 0; i < positions.length; i += 3) {
        const px = positions[i] ?? 0
        const py = positions[i + 1] ?? 0
        const pz = positions[i + 2] ?? 0
        
        positions[i] = px + (velocities[i] ?? 0)
        positions[i + 1] = py + (velocities[i + 1] ?? 0)
        positions[i + 2] = pz + (velocities[i + 2] ?? 0)

        // Wrap around
        const vx = velocities[i] ?? 0
        const vy = velocities[i + 1] ?? 0
        const vz = velocities[i + 2] ?? 0
        
        if (Math.abs(positions[i] ?? 0) > 30 && vx !== 0) velocities[i] = -vx
        if (Math.abs(positions[i + 1] ?? 0) > 30 && vy !== 0) velocities[i + 1] = -vy
        if (Math.abs(positions[i + 2] ?? 0) > 30 && vz !== 0) velocities[i + 2] = -vz
      }

      posAttr.needsUpdate = true
      ref.current.rotation.y = state.clock.elapsedTime * 0.01
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        vertexColors
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.7}
      />
    </Points>
  )
}

// Enhanced Rotating Torus with glow effect
function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
      ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 2
    }
  })

  return (
    <mesh ref={ref} position={[-4, 1.5, -5]}>
      <torusGeometry args={[2, 0.5, 24, 120]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={0.6}
        wireframe={false}
        transparent
        opacity={0.8}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Advanced Morphing Sphere with complex deformations
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geoRef = useRef<THREE.SphereGeometry | null>(null)
  const originalPositions = useRef<Float32Array | null>(null)

  useEffect(() => {
    if (meshRef.current && !geoRef.current) {
      const originalGeo = meshRef.current.geometry as THREE.SphereGeometry
      geoRef.current = originalGeo.clone()
      meshRef.current.geometry = geoRef.current
      const posAttr = geoRef.current.attributes.position
      if (posAttr && posAttr.array) {
        originalPositions.current = new Float32Array(posAttr.array as Float32Array)
      }
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

    const pos = geoRef.current.attributes.position
    if (!pos || !pos.array) return
    
    const time = state.clock.elapsedTime
    const arr = pos.array as Float32Array
    const orig = originalPositions.current

    for (let i = 0; i < arr.length; i += 3) {
      const origI = orig[i] ?? 0
      const origI1 = orig[i + 1] ?? 0
      const origI2 = orig[i + 2] ?? 0
      
      const noise = 
        Math.sin(origI * 3 + time) * 
        Math.cos(origI1 * 3 + time * 0.7) * 
        Math.sin(origI2 * 2 + time * 0.3) * 0.2

      arr[i] = origI + origI * noise
      arr[i + 1] = origI1 + origI1 * noise
      arr[i + 2] = origI2 + origI2 * noise
    }

    pos.needsUpdate = true
    meshRef.current.rotation.y = time * 0.15
    meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.3
  })

  return (
    <mesh ref={meshRef} position={[4, -1, -6]}>
      <sphereGeometry args={[1.5, 96, 96]} />
      <meshStandardMaterial
        color="#9D4EDD"
        emissive="#FF006E"
        emissiveIntensity={0.5}
        wireframe={false}
        transparent
        opacity={0.7}
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  )
}

// Floating Cube with enhanced dynamics
function FloatingCube() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
      ref.current.position.y = 2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.8
      ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 1.5
    }
  })

  return (
    <mesh ref={ref} position={[0, 2, -4]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={0.5}
        wireframe={false}
        transparent
        opacity={0.7}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  )
}

// New: Animated Octahedron
function AnimatedOctahedron() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5
      ref.current.rotation.y = state.clock.elapsedTime * 0.6
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 1.2
      ref.current.position.z = Math.cos(state.clock.elapsedTime * 0.4) * 2
    }
  })

  return (
    <mesh ref={ref} position={[-2, -2, -3]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#FF006E"
        emissive="#FF006E"
        emissiveIntensity={0.4}
        wireframe={false}
        transparent
        opacity={0.6}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  )
}

// New: Icosahedron with complex rotation
function ComplexIcosahedron() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.25
      ref.current.rotation.y = state.clock.elapsedTime * 0.35
      ref.current.rotation.z = state.clock.elapsedTime * 0.15
      ref.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.3
    }
  })

  return (
    <mesh ref={ref} position={[3, 2, -5]}>
      <icosahedronGeometry args={[0.8, 2]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive="#9D4EDD"
        emissiveIntensity={0.3}
        wireframe={false}
        transparent
        opacity={0.6}
        metalness={0.4}
        roughness={0.6}
      />
    </mesh>
  )
}

// Scene composition with advanced lighting
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[15, 15, 15]} intensity={1.2} color="#00D9FF" />
      <pointLight position={[-15, -15, -15]} intensity={0.8} color="#FF006E" />
      <pointLight position={[10, -10, 5]} intensity={0.6} color="#9D4EDD" />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />
      
      <ParticleField />
      <RotatingTorus />
      <MorphingSphere />
      <FloatingCube />
      <AnimatedOctahedron />
      <ComplexIcosahedron />
    </>
  )
}

export default function Scene3D() {
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    console.error('WebGL/Three.js error occurred')
    setHasError(true)
    window.dispatchEvent(new CustomEvent('webgl-error'))
  }

  if (hasError) {
    return null
  }

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        performance={{ min: 0.4, max: 1 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          precision: 'highp'
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050505', 0)
          gl.outputColorSpace = THREE.SRGBColorSpace
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1
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
