// src/components/CustomCursor.js
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.cursor = "none";

    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      // Move main cursor dot
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }

      // Move follower with a delay (will be handled by framer-motion)
      if (followerRef.current) {
        followerRef.current.style.top = `${clientY}px`;
        followerRef.current.style.left = `${clientX}px`;
      }
    };

    // Add hover class for interactive elements
    const handleMouseOver = (e) => {
      const targetElement = e.target;

      // Check if the element or its parent is interactive
      if (
        targetElement.tagName === "BUTTON" ||
        targetElement.tagName === "A" ||
        targetElement.closest("a") ||
        targetElement.closest("button") ||
        targetElement.classList.contains("cursor-pointer") ||
        targetElement.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Check if cursor is over modal
    const checkModalVisibility = (e) => {
      // Check if cursor is over any modal element
      const modalElement = document.querySelector('[role="dialog"]') ||
        document.querySelector('.fixed.inset-0.bg-black.bg-opacity-70');

      if (modalElement) {
        // If modal exists, make sure cursor is visible
        setIsVisible(true);
      }
    };

    // Add event listeners
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousemove", checkModalVisibility);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousemove", checkModalVisibility);
    };
  }, []);

  return (
    <>
      {/* Main dot cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor fixed top-0 left-0 w-3 h-3 bg-green-500 rounded-full pointer-events-none z-[9999] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ marginLeft: "-1.5px", marginTop: "-1.5px" }}
      />

      <motion.div
        ref={followerRef}
        className={`custom-cursor-follower fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] mix-blend-difference ${isHovering ? "bg-green-400" : "border-2 border-white bg-transparent"
          } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          opacity: { duration: 0.2 }
        }}
        style={{ marginLeft: "-11px", marginTop: "-11px" }}
      />
    </>
  );
};

export default CustomCursor;