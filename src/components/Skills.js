import { BadgeCheckIcon, ChipIcon } from "@heroicons/react/solid";
import React from "react";
import { skills } from "../data";
import { motion } from "framer-motion";

export default function Skills() {
  // Sample skill levels - you would add these to your data.js
  const skillLevels = {
    "React.Js": 90,
    "Vue.Js": 75,
    "Angular": 70,
    "Node.Js": 85,
    "JavaScript": 95,
    "Python": 80,
    "MongoDB": 85,
    "MySQL": 80,
    "Material UI": 85,
    "Bootstrap": 90,
    "Next.Js": 80
  };

  return (
    <section id="skills">
      <div className="container px-5 py-10 mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <ChipIcon className="w-10 inline-block mb-4" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
            Skills &amp; Technologies
          </h1>
        </motion.div>
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          {skills.map((skill) => (
            <motion.div 
              key={skill} 
              className="p-2 sm:w-1/2 w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gray-800 rounded p-4 h-full">
                <div className="flex items-center mb-2">
                  <BadgeCheckIcon className="text-green-400 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium text-white">
                    {skill}
                  </span>
                  <span className="ml-auto text-white">
                    {skillLevels[skill]}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-green-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skillLevels[skill]}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}