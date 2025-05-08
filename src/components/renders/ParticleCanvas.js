// src/components/renders/ParticleCanvas.js
import React, { useEffect, useRef } from "react";

const ParticleCanvas = ({ 
  color = "#10b981", 
  density = 70,
  connectionDistance = 120,
  speed = 0.5,
  particleSize = 2,
  responsive = true 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let animationFrameId;
    let particles = [];
    let width = canvas.width;
    let height = canvas.height;
    let mousePosition = { x: null, y: null };
    
    // Set canvas size
    const setCanvasSize = () => {
      if (responsive) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } else {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
      width = canvas.width;
      height = canvas.height;
    };
    
    // Initialize the particles
    const init = () => {
      particles = [];
      const particlesCount = Math.min(Math.floor(width * height / 8000), density);
      
      for (let i = 0; i < particlesCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * particleSize + 0.5,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    // Handle mouse leave
    const handleMouseLeave = () => {
      mousePosition = { x: null, y: null };
    };
    
    // Draw particles
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        
        // Calculate distance to mouse if any
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Create gravity effect 
          if (distance < 120) {
            const forceX = dx / distance;
            const forceY = dy / distance;
            particle.x -= forceX * 0.5;
            particle.y -= forceY * 0.5;
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        // Parse the color to get RGB values
        let r, g, b;
        if (color.startsWith('#')) {
          const hex = color.substring(1);
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
        } else if (color.startsWith('rgb')) {
          const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            [, r, g, b] = match.map(Number);
          } else {
            [r, g, b] = [16, 185, 129]; // default green
          }
        } else {
          [r, g, b] = [16, 185, 129]; // default green
        }
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
        ctx.fill();
        
        // Draw connections to nearby particles
        connectParticles(particle, particles.slice(i + 1));
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Draw connections between particles
    const connectParticles = (p1, particles) => {
      particles.forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          // Parse color to get RGB values
          let r, g, b;
          if (color.startsWith('#')) {
            const hex = color.substring(1);
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
          } else if (color.startsWith('rgb')) {
            const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
              [, r, g, b] = match.map(Number);
            } else {
              [r, g, b] = [16, 185, 129]; // default green
            }
          } else {
            [r, g, b] = [16, 185, 129]; // default green
          }
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.1 * (1 - distance / connectionDistance)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    };
    
    // Set up the canvas and start the animation
    setCanvasSize();
    init();
    draw();
    
    // Event listeners
    window.addEventListener('resize', () => {
      setCanvasSize();
      init();
    });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [color, density, connectionDistance, speed, particleSize, responsive]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleCanvas;