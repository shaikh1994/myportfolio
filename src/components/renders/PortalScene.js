// src/components/renders/PortalScene.js
import React, { useEffect, useRef } from 'react'
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function PortalScene() {
  const { scene } = useGLTF('https://assets.codepen.io/22914/portal-2.glb')
  const bakedTexture = useTexture('https://assets.codepen.io/22914/baked-02.jpg')
  bakedTexture.flipY = false
  bakedTexture.encoding = THREE.sRGBEncoding

  const portalMaterialRef = useRef()
  const controlsRef = useRef()
  const firefliesRef = useRef()

  const { camera } = useThree()

  // 🔥 generate fireflies geometry
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
    // 🔥 replace baked material
    const bakedMesh = scene.children.find((child) => child.name === 'baked')
    if (bakedMesh) bakedMesh.material = new THREE.MeshBasicMaterial({ map: bakedTexture })

    // 🔥 replace portal material
    const portalLight = scene.children.find((child) => child.name === 'portalCircle')
    if (portalLight) {
      portalLight.material = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColorStart;
          uniform vec3 uColorEnd;
          varying vec2 vUv;
          float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
          void main() {
            vec2 displacedUv = vUv + vec2(random(vUv + uTime * 0.1));
            float strength = random(displacedUv + uTime * 0.2);
            strength += smoothstep(0.4, 0.5, distance(vUv, vec2(0.5)));
            vec3 color = mix(uColorStart, uColorEnd, strength);
            gl_FragColor = vec4(color, 1.0);
          }`,
        uniforms: {
          uTime: { value: 0 },
          uColorStart: { value: new THREE.Color('#b91fac') },
          uColorEnd: { value: new THREE.Color('#ffebf3') },
        },
      })
      portalMaterialRef.current = portalLight.material
    }

    // 🔥 replace lamp lights material
    scene.children
      .filter((child) => child.name.includes('lampLight'))
      .forEach((lamp) => {
        lamp.material = new THREE.MeshBasicMaterial({ color: '#f0bf94' })
      })

    // ✅ OrbitControls restrictions
    if (controlsRef.current) {
      controlsRef.current.maxPolarAngle = Math.PI / 2 - 0.1
      controlsRef.current.target.set(0, 1, 0)
      controlsRef.current.update()
      controlsRef.current.minDistance = 2
      controlsRef.current.maxDistance = 10
    }
  }, [scene, bakedTexture])

  // 🔥 animate portal and fireflies
  useFrame(({ clock }) => {
    if (portalMaterialRef.current) portalMaterialRef.current.uniforms.uTime.value = clock.elapsedTime
    if (firefliesRef.current) firefliesRef.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <>
      <primitive object={scene} />
      
      {/* 🔥 fireflies */}
      <points ref={firefliesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={firefliesPositions}
            count={firefliesCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aScale"
            array={firefliesScales}
            count={firefliesCount}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={`
            uniform float uTime;
            attribute float aScale;
            void main() {
              vec4 modelPosition = modelMatrix * vec4(position, 1.0);
              modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
              modelPosition.z += cos(uTime + modelPosition.x * 100.0) * aScale * 0.2;
              modelPosition.x += cos(uTime + modelPosition.x * 100.0) * aScale * 0.2;
              gl_Position = projectionMatrix * viewMatrix * modelPosition;
              gl_PointSize = 8.0 * aScale * (1.0 / -viewMatrix * modelPosition).z;
            }`}
          fragmentShader={`
            void main() {
              float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
              float strength = 0.05 / distanceToCenter - 0.1;
              gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
            }`}
          uniforms={{
            uTime: { value: 0 },
          }}
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
