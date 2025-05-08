// src/components/Projects.js with filtering functionality
import { CodeIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  // Extract unique technologies from all projects
  const allTechnologies = [];
  projects.forEach((project) => {
    const techList = project.description.split(',').map(tech => tech.trim());
    techList.forEach(tech => {
      if (!allTechnologies.includes(tech) && tech) {
        allTechnologies.push(tech);
      }
    });
  });

  // State for active filter
  const [activeFilter, setActiveFilter] = useState("All");
  // Filtered projects
  const [filteredProjects, setFilteredProjects] = useState(projects);
  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle filter change
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter((project) => 
      project.description.includes(activeFilter)
    );
    setFilteredProjects(filtered);
  }, [activeFilter]);

  // Open modal with project details
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-10">
          <CodeIcon className="mx-auto inline-block w-10 mb-4" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
            Apps I've Built
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Check out some of my recent projects. Filter by technology to see specific work.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center mb-10">
          <button
            onClick={() => setActiveFilter("All")}
            className={`m-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
              activeFilter === "All" 
                ? "bg-green-500 text-white" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          
          {["React", "Node.Js", "MongoDB", "Angular", "Vue.Js", "NextJS"].map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`m-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                activeFilter === tech 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <AnimatePresence>
          <div className="flex flex-wrap -m-5">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={project.image}
                  className="sm:w-1/2 w-100 p-4"
                  onClick={() => openProjectModal(project)}
                >
                  <div className="flex relative border-4 border-gray-800 rounded-lg overflow-hidden cursor-pointer group">
                    <img
                      alt="gallery"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      style={{ objectFit: 'cover', height: '100%', aspectRatio: '4 / 3' }}
                      src={project.image}
                    />
                    <div className="px-8 py-10 relative z-10 w-full bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1">
                        {project.subtitle}
                      </h2>
                      <h1 className="title-font text-lg font-medium text-white mb-3">
                        {project.title}
                      </h1>
                      <p className="leading-relaxed">{project.description}</p>
                      <div className="mt-3 flex justify-center">
                        <button className="inline-flex items-center text-green-400 hover:text-green-300">
                          View Details
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center py-10"
              >
                <p className="text-xl">No projects found with {activeFilter}.</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
}