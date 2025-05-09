// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if a theme preference is saved in localStorage, otherwise check system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // If no saved preference, check system preference
    const prefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return prefersDark ? "dark" : "light";
  };
  
  const [theme, setTheme] = useState(getInitialTheme);

  // Function to update the theme
  const updateTheme = (newTheme) => {
    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove("dark");
    
    // Add the appropriate class based on theme
    if (newTheme === "dark") {
      root.classList.add("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("theme", newTheme);
    
    // Update state
    setTheme(newTheme);
  };

  // Initial theme setup on mount
  useEffect(() => {
    updateTheme(theme);
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Only update if there's no localStorage preference
      if (!localStorage.getItem("theme")) {
        updateTheme(mediaQuery.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};