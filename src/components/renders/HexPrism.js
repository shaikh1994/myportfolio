import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

const HexPrism = ({ skills }) => {
  // Create hexagonal prism geometry
  const radius = 2;
  const height = 1;
  const shape = new THREE.Shape();
  
  // Define 6-sided hexagon shape
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
  }
  shape.closePath();
  
  // Extrude to make prism
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 5, 5]} intensity={0.6} />
      
      <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="gray" wireframe={false} />
      </mesh>

      {/* Add skill labels */}
      {skills.slice(0,6).map((skill, idx) => {
        const angle = (idx / 6) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <Text
            key={idx}
            position={[x, y, height / 2 + 0.1]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        );
      })}
      
      <OrbitControls enablePan={false} />
    </Canvas>
  );
};

export default HexPrism;
