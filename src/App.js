// src/App.js 
import React, { useEffect } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import SEO from "./components/SEO";
import CustomCursor from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Animation for scroll-based reveals
  useEffect(() => {
    // Create scroll-triggered animations
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll(".animate-on-scroll"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <ThemeProvider>
      <SEO />
      <CustomCursor />
      <main className="text-gray-400 bg-gray-900 dark:bg-gray-900 dark:text-gray-400 bg-white text-gray-800 body-font relative">
        {/* Hero section with particle background */}
        <div className="relative">
          <ParticleBackground />
          <Navbar />
          <About />
        </div>
        
        {/* Projects section with modal functionality */}
        <div className="relative">
          <Projects />
        </div>
        
        {/* Skills section - 3D cube moved to About section */}
        <div className="relative py-10">
          <Skills />
        </div>
        
        {/* Experience Timeline */}
        <ExperienceTimeline />
        
        {/* Testimonials with improved carousel */}
        <Testimonials />
        
        {/* Contact section */}
        <Contact />
        
        {/* Scroll to top button */}
        <ScrollToTop />
      </main>
    </ThemeProvider>
  );
}