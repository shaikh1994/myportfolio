// src/components/Testimonials.js
import React, { useState, useEffect } from "react";
import { TerminalIcon, UsersIcon } from "@heroicons/react/solid";
import { testimonials } from "../data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const slideVariants = {
    hiddenRight: {
      x: 300,
      opacity: 0,
    },
    hiddenLeft: {
      x: -300,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === "next") {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      paginate("next");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials">
      <div className="container px-5 py-10 mx-auto text-center">
        <UsersIcon className="w-10 inline-block mb-4" />
        <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-12">
          Client Testimonials
        </h1>
        
        {/* Testimonial Carousel */}
        <div className="relative flex justify-center w-full">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial={direction === "next" ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit"
              className="flex-grow max-w-lg mx-auto relative"
            >
              <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                <TerminalIcon className="block w-8 text-gray-500 mb-4 mx-auto" />
                <p className="leading-relaxed mb-6 text-lg">
                  {testimonials[currentIndex].quote}
                </p>
                <div className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src={testimonials[currentIndex].image}
                    className="w-12 rounded-full flex-shrink-0 object-cover object-center"
                    loading="lazy"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-white">
                      {testimonials[currentIndex].name}
                    </span>
                    <span className="text-gray-500 text-sm uppercase">
                      {testimonials[currentIndex].company}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <button
            onClick={() => paginate("prev")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          
          <button
            onClick={() => paginate("next")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? "next" : "prev");
                setCurrentIndex(index);
              }}
              className={`h-3 w-3 mx-1 rounded-full focus:outline-none ${
                currentIndex === index ? "bg-green-500" : "bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}