// src/components/About.js
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function About() {
  // Create Ref element for Typed
  const typedRef = useRef(null);

  useEffect(() => {
    // Options for Typed.js
    const options = {
      strings: [
        "I build web applications.",
        "I create mobile apps with Flutter.",
        "I develop ML solutions.",
        "I love to solve problems."
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|"
    };

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, options);

    // Cleanup function
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section id="about">
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, I'm Shaikh.
            <br className="hidden lg:inline-block" />
            <span ref={typedRef} className="text-green-500"></span>
          </h1>
          <p className="mb-8 leading-relaxed">
            I am a Full-Stack Developer. Currently focusing on building amazing websites along with app development with flutter and machine learning.
          </p>
          <div className="flex justify-center">
            <a
              href="#contact"
              className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg transition-colors duration-300">
              Work With Me
            </a>
            <a
              href="#projects"
              className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg transition-colors duration-300">
              See My Past Work
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="./coder.svg"
          />
        </div>
      </div>
    </section>
  );
}