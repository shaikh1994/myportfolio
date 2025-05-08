// src/App.js with enhanced components
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
import RotatingCube from "./components/RotatingCube";
import ScrollToTop from "./components/ScrollToTop";
import { skills } from "./data";
import { ThemeProvider } from "./context/ThemeContext";
import { motion, useAnimation } from "framer-motion";
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
      <main className="text-gray-400 bg-gray-900 dark:bg-gray-900 dark:text-gray-400 light:bg-white light:text-gray-800 body-font relative">
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
        
        {/* Skills section with 3D rotating cube */}
        <div className="relative py-10">
          <div className="container mx-auto px-5">
            <motion.div 
              className="text-center mb-10 animate-on-scroll"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
                Featured Skills
              </h2>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Explore my key technical abilities represented in this interactive 3D showcase.
              </p>
              <div className="h-1 w-20 bg-green-500 rounded mt-6 mb-8 mx-auto"></div>
            </motion.div>
            
            <div className="flex flex-wrap">
              <div className="lg:w-1/2 md:w-full px-4 mb-10 md:mb-0">
                <RotatingCube skills={skills.slice(0, 6)} />
              </div>
              <div className="lg:w-1/2 md:w-full px-4">
                <Skills />
              </div>
            </div>
          </div>
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