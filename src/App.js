// src/App.js
import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import SEO from "./components/SEO";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <SEO />
      <main className="text-gray-400 bg-gray-900 dark:bg-gray-900 dark:text-gray-400 light:bg-white light:text-gray-800 body-font">
        <Navbar />
        <About />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
    </ThemeProvider>
  );
}