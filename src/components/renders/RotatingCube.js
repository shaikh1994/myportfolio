// src/components/RotatingCube.js
import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

const RotatingCube = ({ skills }) => {
  // Limit to 6 skills for the cube faces
  const cubeSkills = skills.slice(0, 6);
  
  // Animation controls
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for tracking mouse/touch positions
  const startPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastUpdateTimeRef = useRef(0);
  const rotationRef = useRef({ x: 0, y: 0 });
  
  // Mouse position for interactive rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to rotation
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);
  
  // Handle mouse/touch start
  const handleDragStart = (e) => {
    setIsDragging(true);
    controls.stop();
    
    // Get starting position
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    
    startPosRef.current = { x: clientX, y: clientY };
    currentPosRef.current = { x: clientX, y: clientY };
    lastUpdateTimeRef.current = Date.now();
    velocityRef.current = { x: 0, y: 0 };
  };
  
  // Handle mouse/touch move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    // Get current position
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    
    // Calculate time since last update
    const now = Date.now();
    const deltaTime = now - lastUpdateTimeRef.current;
    
    if (deltaTime > 0) {
      // Calculate velocity (change in position / time)
      velocityRef.current = {
        x: (clientX - currentPosRef.current.x) / deltaTime * 100, // Scale for effect
        y: (clientY - currentPosRef.current.y) / deltaTime * 100
      };
      
      // Update rotation based on mouse/touch movement
      rotationRef.current = {
        x: rotationRef.current.x + (currentPosRef.current.y - clientY) / 5,
        y: rotationRef.current.y + (clientX - currentPosRef.current.x) / 5
      };
      
      // Update current position and time
      currentPosRef.current = { x: clientX, y: clientY };
      lastUpdateTimeRef.current = now;
      
      // Apply the rotation
      const element = document.querySelector('.cube-container');
      if (element) {
        element.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
      }
    }
  };
  
  // Handle mouse/touch end
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Calculate velocity at release for "flick" effect
    const velocityX = velocityRef.current.x;
    const velocityY = velocityRef.current.y;
    
    // Only apply spin animation if there's enough velocity
    const velocityMagnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    
    if (velocityMagnitude > 20) {
      // Determine direction and strength of spin
      const spinDuration = Math.min(Math.max(velocityMagnitude / 50, 2), 6); // 2-6 seconds based on velocity
      const spinRotations = Math.min(Math.max(Math.round(velocityMagnitude / 100), 1), 5); // 1-5 rotations
      
      // Start the spinning animation
      controls.start({
        rotateX: [rotationRef.current.x, rotationRef.current.x + (velocityY < 0 ? -360 : 360) * spinRotations],
        rotateY: [rotationRef.current.y, rotationRef.current.y + (velocityX > 0 ? -360 : 360) * spinRotations],
        transition: { 
          duration: spinDuration, 
          ease: "easeOut",
        }
      });
    }
  };
  
  // Handle regular mouse movement (non-dragging)
  const handleMouseMove = (e) => {
    if (!isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  // Start auto-rotation animation when not interacting
  useEffect(() => {
    let timeout;
    
    const startRotation = async () => {
      await controls.start({
        rotateX: [0, 360],
        rotateY: [0, 360],
        transition: { 
          duration: 20, 
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    };
    
    if (!isHovered && !isDragging) {
      timeout = setTimeout(startRotation, 1000);
    } else if (!isDragging) {
      controls.stop();
    }
    
    return () => clearTimeout(timeout);
  }, [controls, isHovered, isDragging]);

  return (
    <div 
      className="perspective-800 w-64 h-64 mx-auto"
      onMouseMove={handleMouseMove}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={() => {
        setIsHovered(false);
        handleDragEnd();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <motion.div
        className="cube-container w-full h-full relative transform-style-3d"
        animate={controls}
        style={{
          rotateX: isHovered && !isDragging ? rotateX : 0,
          rotateY: isHovered && !isDragging ? rotateY : 0,
        }}
      >
        {/* Cube faces */}
        {cubeSkills.map((skill, index) => {
          // Calculate face position
          const positions = [
            { transform: "translateZ(8rem)" }, // front
            { transform: "rotateY(180deg) translateZ(8rem)" }, // back
            { transform: "rotateY(90deg) translateZ(8rem)" }, // right
            { transform: "rotateY(-90deg) translateZ(8rem)" }, // left
            { transform: "rotateX(90deg) translateZ(8rem)" }, // top
            { transform: "rotateX(-90deg) translateZ(8rem)" }, // bottom
          ];
          
          return (
            <div
              key={index}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-90 border-2 border-green-500 text-center p-4 select-none"
              style={positions[index]}
            >
              <div>
                <div className="text-green-400 text-lg font-bold mb-2">{skill}</div>
                <div className="w-12 h-1 bg-green-500 mx-auto rounded-full"></div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default RotatingCube;