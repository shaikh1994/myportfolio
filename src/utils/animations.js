// src/utils/animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a scroll-triggered animation for elements with the specified class
 * @param {string} triggerElement - CSS selector for the trigger element
 * @param {string} animatedElements - CSS selector for elements to animate
 * @param {Object} fromVars - GSAP fromVars object
 * @param {Object} toVars - GSAP toVars object
 * @param {Object} scrollOptions - ScrollTrigger options
 */
export const createScrollAnimation = (
  triggerElement,
  animatedElements,
  fromVars = { y: 50, opacity: 0 },
  toVars = { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
  scrollOptions = {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none none",
  }
) => {
  gsap.fromTo(
    document.querySelectorAll(animatedElements),
    fromVars,
    {
      ...toVars,
      scrollTrigger: {
        trigger: document.querySelector(triggerElement),
        ...scrollOptions,
      },
    }
  );
};

/**
 * Predefined animation variants for Framer Motion
 */
export const motionVariants = {
  // Fade up animation
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  },
  
  // Fade in animation
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
  },
  
  // Scale up animation
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  },
  
  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
  },
  
  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
  },
  
  // Staggered container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  },
  
  // Staggered item
  staggerItem: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
};

/**
 * Initialize page transition animations
 */
export const initPageTransitions = () => {
  // Page enter animation
  gsap.from("body > main", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
  });
  
  // Link click animation for internal navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function() {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: document.querySelector(this.getAttribute('href')),
          offsetY: 80
        },
        ease: "power2.inOut"
      });
    });
  });
};