// src/components/renders/ParticleBackground3D.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground3D = ({ 
  particleCount = 200,
  particleColor = '#10b981',
  backgroundColor = '#111111',
  interactiveDistance = 120,
  particleSize = 2,
  particleSpeed = 0.3,
  depth = 100
}) => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 500;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Parse color to get RGB values
    const getColorValues = (color) => {
      if (color.startsWith('#')) {
        const hex = color.substring(1);
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
        return { r, g, b };
      } else if (color.startsWith('rgb')) {
        const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const [, r, g, b] = match.map(n => parseInt(n, 10) / 255);
          return { r, g, b };
        }
      }
      return { r: 0.06, g: 0.73, b: 0.5 }; // Default green
    };
    
    const colorValues = getColorValues(particleColor);
    
    // Create particles
    const particles = new THREE.Group();
    scene.add(particles);
    
    // Geometry and materials
    const particlesGeometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(particleCount * 3);
    const velocityArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Positions
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * window.innerWidth;
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * window.innerHeight;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * depth;
      
      // Random velocities
      velocityArray[i * 3 + 0] = (Math.random() - 0.5) * particleSpeed;
      velocityArray[i * 3 + 1] = (Math.random() - 0.5) * particleSpeed;
      velocityArray[i * 3 + 2] = (Math.random() - 0.5) * particleSpeed;
    }
    
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3)
    );
    
    // Custom shader material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(colorValues.r, colorValues.g, colorValues.b),
      size: particleSize,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.add(particlesMesh);
    
    // Lines for connecting particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(colorValues.r, colorValues.g, colorValues.b),
      transparent: true,
      opacity: 0.3
    });
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Handle mouse movement
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    // Animation loop
    const lines = [];
    const animate = () => {
      // Remove old lines
      lines.forEach(line => particles.remove(line));
      lines.length = 0;
      
      // Update particle positions
      const positions = particlesGeometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        // Update positions based on velocity
        positions[i * 3 + 0] += velocityArray[i * 3 + 0];
        positions[i * 3 + 1] += velocityArray[i * 3 + 1];
        positions[i * 3 + 2] += velocityArray[i * 3 + 2];
        
        // Boundary wrapping
        if (positions[i * 3 + 0] > window.innerWidth / 2) positions[i * 3 + 0] = -window.innerWidth / 2;
        if (positions[i * 3 + 0] < -window.innerWidth / 2) positions[i * 3 + 0] = window.innerWidth / 2;
        if (positions[i * 3 + 1] > window.innerHeight / 2) positions[i * 3 + 1] = -window.innerHeight / 2;
        if (positions[i * 3 + 1] < -window.innerHeight / 2) positions[i * 3 + 1] = window.innerHeight / 2;
        if (positions[i * 3 + 2] > depth / 2) positions[i * 3 + 2] = -depth / 2;
        if (positions[i * 3 + 2] < -depth / 2) positions[i * 3 + 2] = depth / 2;
        
        // Mouse interaction - create a small gravitational effect
        if (mousePosition.current.x !== 0 || mousePosition.current.y !== 0) {
          const mouseX = mousePosition.current.x * window.innerWidth / 2;
          const mouseY = mousePosition.current.y * window.innerHeight / 2;
          
          const dx = mouseX - positions[i * 3 + 0];
          const dy = mouseY - positions[i * 3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactiveDistance) {
            positions[i * 3 + 0] += dx * 0.02;
            positions[i * 3 + 1] += dy * 0.02;
          }
        }
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Connect nearby particles with lines
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = {
            x: positions[i * 3 + 0],
            y: positions[i * 3 + 1],
            z: positions[i * 3 + 2]
          };
          
          const p2 = {
            x: positions[j * 3 + 0],
            y: positions[j * 3 + 1],
            z: positions[j * 3 + 2]
          };
          
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) +
            Math.pow(p1.y - p2.y, 2) +
            Math.pow(p1.z - p2.z, 2)
          );
          
          if (distance < interactiveDistance) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(p1.x, p1.y, p1.z),
              new THREE.Vector3(p2.x, p2.y, p2.z)
            ]);
            
            const lineMaterial = linesMaterial.clone();
            lineMaterial.opacity = 0.2 * (1 - distance / interactiveDistance);
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            particles.add(line);
            lines.push(line);
          }
        }
      }
      
      // Rotate particles slightly for a nice effect
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    // Start animation and add event listeners
    animate();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current.removeChild(renderer.domElement);
      
      // Dispose of resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, [backgroundColor, particleColor, particleCount, particleSize, particleSpeed, depth, interactiveDistance]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ 
        overflow: 'hidden',
        background: backgroundColor 
      }}
    />
  );
};

export default ParticleBackground3D;