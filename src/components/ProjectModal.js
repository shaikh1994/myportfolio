// src/components/ProjectModal.js
import React, { useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, isOpen, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gray-800 rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left: Project Image */}
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Project Details */}
              <div className="md:w-1/2 p-6 overflow-y-auto max-h-[90vh] md:max-h-[unset]">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white focus:outline-none transition-colors"
                    aria-label="Close modal"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="text-green-400 text-lg mb-2">
                    {project.subtitle}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.longDescription || "This project showcases my abilities in creating modern, responsive web applications with a focus on user experience and performance. I utilized the latest technologies to build a solution that addresses real-world problems."}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-2">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.description.split(",").map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-2">
                      Key Features
                    </h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Responsive design for all device sizes</li>
                      <li>Intuitive user interface and smooth animations</li>
                      <li>Optimized performance and fast loading times</li>
                      <li>Secure authentication and data handling</li>
                    </ul>
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Visit Live Project
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}