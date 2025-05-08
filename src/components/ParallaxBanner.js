// src/components/ParallaxBanner.js
import React from "react";
import { Parallax } from "react-parallax";

export default function ParallaxBanner({ title, subtitle, bgImage, height = "300px" }) {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={bgImage}
      bgImageAlt="parallax background"
      strength={200}
    >
      <div style={{ height: height }} className="flex items-center justify-center">
        <div className="text-center px-4 py-16 bg-gray-900 bg-opacity-60 w-full">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-300">{subtitle}</p>
          )}
        </div>
      </div>
    </Parallax>
  );
}

// Now, update your App.js to use the parallax banners between sections
// src/App.js
import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import ParallaxBanner from "./components/ParallaxBanner";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <main className="text-gray-400 bg-gray-900 body-font">
        <Navbar />
        <About />
        
        <ParallaxBanner 
          title="My Work" 
          subtitle="Check out my recent projects"
          bgImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
        
        <Projects />
        
        <ParallaxBanner 
          title="My Skills" 
          subtitle="Technologies I've mastered"
          bgImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
        />
        
        <Skills />
        
        <ParallaxBanner 
          title="Client Feedback" 
          subtitle="What others say about working with me"
          bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
        
        <Testimonials />
        <Contact />
        <ScrollToTop />
      </main>
    </ThemeProvider>
  );
}