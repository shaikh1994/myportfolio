import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'

export default function HexagonalDice() {
  const labels = ['React', 'Node.js', 'Three.js', 'MongoDB', 'Flutter', 'Python']
  const radius = 1
  const height = 2

  const facePositions = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return [x, y, 0]
  })

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <OrbitControls />

      {/* Hexagonal prism */}
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 6]} />
        <meshStandardMaterial color="limegreen" />
      </mesh>

      {/* Labels on side faces */}
      {facePositions.map((pos, idx) => (
        <Html
          position={[pos[0] * 1.05, pos[1] * 1.05, 0]} // slightly offset from surface
          rotation={[0, 0, -((idx / 6) * Math.PI * 2)]}
          center
          key={idx}
        >
          <div style={{ color: 'white', fontSize: '14px', transform: 'rotate(90deg)' }}>
            {labels[idx]}
          </div>
        </Html>
      ))}
    </Canvas>
  )
}
