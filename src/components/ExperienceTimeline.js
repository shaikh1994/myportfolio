// src/components/ExperienceTimeline.js
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Experience data based on your CV
const experienceData = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Aerorights",
    period: "2024 - Present",
    description: "Developing LLM-driven features using OpenAI's GPT models for automated text summarization and sentiment analysis. Building interactive Streamlit applications and implementing secure FastAPI-based backend services with MongoDB integration.",
    skills: ["OpenAI", "Streamlit", "FastAPI", "MongoDB", "Angular", "Azure"],
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Tab Next Limited",
    period: "2023",
    description: "Developed healthcare informatics solutions including Health check Center CMS and Imaging Center Solutions. Implemented machine learning models to enhance diagnostic accuracy and deployed cloud-based solutions for medical image storage.",
    skills: ["Healthcare Informatics", "ML Models", "AWS", "AI-driven Applications"],
  },
  {
    id: 3,
    role: "Full-Stack Developer",
    company: "Tarifica",
    period: "2022 - 2023",
    description: "Designed and maintained web applications using React JS, Node.js, and MongoDB. Developed a Slack bot with Python and implemented machine learning algorithms for predictive analysis. Created an AI-enabled chatbot using GPT API.",
    skills: ["React JS", "Node.js", "MongoDB", "Python", "Azure", "GPT AI API"],
  },
  {
    id: 4,
    role: "Junior Full-Stack Developer",
    company: "Tarifica",
    period: "2021 - 2022",
    description: "Collaborated with cross-functional teams to develop applications, participated in code reviews and testing, and maintained GIT version control. Engaged in Agile development processes.",
    skills: ["Version Control", "Agile", "Testing", "Debugging"],
  },
  {
    id: 5,
    role: "Internship",
    company: "Banglalion Wimax",
    period: "2017 - 2018",
    description: "Analyzed ISP and communication systems in Bangladesh to identify prospects and challenges. Worked with senior developers on various tasks and conducted market research.",
    skills: ["Market Research", "Data Analysis", "Communication Systems"],
  },
];

const ExperienceItem = ({ experience, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex relative" ref={ref}>
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute h-full w-0.5 bg-gray-700 left-6 top-6 z-0"></div>
      )}
      
      {/* Timeline Content */}
      <motion.div 
        className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800 border-4 border-green-500 flex items-center justify-center z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="text-lg font-bold text-white">{index + 1}</span>
      </motion.div>
      
      <motion.div 
        className="ml-6 p-6 bg-gray-800 rounded-lg mb-10 flex-grow"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-wrap justify-between items-center mb-3">
          <h3 className="text-xl font-medium text-white">
            {experience.role}
          </h3>
          <span className="text-sm text-green-400 font-medium">
            {experience.period}
          </span>
        </div>
        
        <h4 className="text-gray-300 text-lg mb-3">
          {experience.company}
        </h4>
        
        <p className="text-gray-400 mb-4">
          {experience.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-2 py-1 bg-gray-700 rounded-full text-xs text-green-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function ExperienceTimeline() {
  const [visibleExperience, setVisibleExperience] = useState(3);
  
  const loadMore = () => {
    setVisibleExperience(prev => Math.min(prev + 3, experienceData.length));
  };
  
  return (
    <section id="experience" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-16">
          <h2 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
            Professional Journey
          </h2>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            My career path showcases my growth as a developer and the diverse projects I've contributed to.
          </p>
          <div className="h-1 w-20 bg-green-500 rounded mt-6 mb-4 mx-auto"></div>
        </div>
        
        <div className="flex flex-col">
          {experienceData.slice(0, visibleExperience).map((exp, index) => (
            <ExperienceItem 
              key={exp.id}
              experience={exp}
              index={index}
              isLast={index === visibleExperience - 1}
            />
          ))}
        </div>
        
        {visibleExperience < experienceData.length && (
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={loadMore}
              className="inline-flex items-center bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-base transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}