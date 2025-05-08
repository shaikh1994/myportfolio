import React, { useEffect, useRef } from 'react'
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function PortalScene() {
  const { scene } = useGLTF('https://assets.codepen.io/22914/portal-2.glb')
  const { scene: characterScene } = useGLTF('/models/anya.glb')  // 🟢 load Anya

  const bakedTexture = useTexture('https://assets.codepen.io/22914/baked-02.jpg')
  bakedTexture.flipY = false
  bakedTexture.encoding = THREE.sRGBEncoding

  const portalMaterialRef = useRef()
  const controlsRef = useRef()
  const firefliesRef = useRef()

  const { camera } = useThree()

  const firefliesCount = 30
  const firefliesPositions = new Float32Array(firefliesCount * 3)
  const firefliesScales = new Float32Array(firefliesCount)
  for (let i = 0; i < firefliesCount; i++) {
    firefliesPositions.set(
      [(Math.random() - 0.5) * 4, Math.random() * 1.5, (Math.random() - 0.5) * 4],
      i * 3
    )
    firefliesScales[i] = Math.random()
  }

  useEffect(() => {
    const bakedMesh = scene.children.find((child) => child.name === 'baked')
    if (bakedMesh) bakedMesh.material = new THREE.MeshBasicMaterial({ map: bakedTexture })

    const portalLight = scene.children.find((child) => child.name === 'portalCircle')
    if (portalLight) {
      portalLight.material = new THREE.ShaderMaterial({
        vertexShader: `...`,
        fragmentShader: `...`,
        uniforms: {
          uTime: { value: 0 },
          uColorStart: { value: new THREE.Color('#b91fac') },
          uColorEnd: { value: new THREE.Color('#ffebf3') },
        },
      })
      portalMaterialRef.current = portalLight.material
    }

    scene.children
      .filter((child) => child.name.includes('lampLight'))
      .forEach((lamp) => {
        lamp.material = new THREE.MeshBasicMaterial({ color: '#f0bf94' })
      })

    if (controlsRef.current) {
      controlsRef.current.maxPolarAngle = Math.PI / 2 - 0.1
      controlsRef.current.target.set(0, 1, 0)
      controlsRef.current.update()
      controlsRef.current.minDistance = 2
      controlsRef.current.maxDistance = 10
    }
  }, [scene, bakedTexture])

  useFrame(({ clock }) => {
    if (portalMaterialRef.current) portalMaterialRef.current.uniforms.uTime.value = clock.elapsedTime
    if (firefliesRef.current) firefliesRef.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <>
      <primitive object={scene} />

      {/* 🟢 Add character */}
      <primitive
        object={characterScene}
        position={[0, 0.2, -1.5]}   // adjust position
        rotation={[0, Math.PI, 0]}  // rotate 180 deg Y
        scale={[0.5, 0.5, 0.5]}     // adjust scale
      />

      {/* fireflies */}
      <points ref={firefliesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={firefliesPositions} count={firefliesCount} itemSize={3} />
          <bufferAttribute attach="attributes-aScale" array={firefliesScales} count={firefliesCount} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={`...`}  // keep your shader
          fragmentShader={`...`}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <OrbitControls ref={controlsRef} enableDamping />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}
