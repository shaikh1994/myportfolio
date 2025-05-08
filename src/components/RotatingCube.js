// src/components/RotatingCube.js
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

const RotatingCube = ({ skills }) => {
  // Limit to 6 skills for the cube faces
  const cubeSkills = skills.slice(0, 6);
  
  // Animation controls
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for interactive rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to rotation
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Start auto-rotation animation
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
    
    if (!isHovered) {
      timeout = setTimeout(startRotation, 1000);
    } else {
      controls.stop();
    }
    
    return () => clearTimeout(timeout);
  }, [controls, isHovered]);

  return (
    <div 
      className="perspective-800 w-64 h-64 mx-auto"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="cube-container w-full h-full relative transform-style-3d"
        animate={controls}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
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
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-90 border-2 border-green-500 text-center p-4"
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