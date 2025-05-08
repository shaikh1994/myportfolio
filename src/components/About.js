// src/components/About.js
import React, {useEffect, useRef} from "react";
import Typed from "typed.js";
import {motion} from "framer-motion";
import {Link} from "react-scroll";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {TbBrandFiverr} from "react-icons/tb";
import {FaSquareUpwork} from "react-icons/fa6";

export default function About() {
    // Create Ref element for Typed
    const typedRef = useRef(null);

    useEffect(() => {
        // Options for Typed.js
        const options = {
            strings: [
                "I build web applications.", "I create mobile apps with Flutter.", "I develop ML solutions.", "I love to solve problems."
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

    // Animation variants
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    // Social media links
    const socialLinks = [
        {
            icon: <FaGithub className="w-6 h-6"/>,
            url: "https://github.com/shaikh1994",
            label: "GitHub"
        }, {
            icon: <FaLinkedin className="w-6 h-6"/>,
            url: "https://www.linkedin.com/in/md-shaikh-rahman-265154171/",
            label: "LinkedIn"
        }, {
            icon: <TbBrandFiverr className="w-6 h-6"/>,
            url: "https://www.fiverr.com/s/NN2q8jp",
            label: "Fiverr"
        }, {
            icon: <MdEmail className="w-6 h-6"/>,
            url: "mailto:shaikhrahman25@gmail.com",
            label: "Email"
        }, {
            icon: <FaSquareUpwork className="w-6 h-6"/>,
            url: "https://www.upwork.com/freelancers/~0107ea8c05c50006f7",
            label: "Upwork"
        }
    ];

    return (
        <section id="about">
            <div
                className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
                <motion.div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    <motion.h1
                        className="title-font sm:text-5xl text-4xl mb-4 font-bold text-white"
                        variants={itemVariants}>
                        Hi, I'm Shaikh.
                        <br className="hidden lg:inline-block"/>
                        <span ref={typedRef} className="text-green-500"></span>
                    </motion.h1>

                    <motion.p className="mb-8 leading-relaxed text-lg" variants={itemVariants}>
                        I am a Full-Stack Developer passionate about creating elegant solutions to
                        complex problems. Currently focusing on building amazing websites, developing
                        mobile apps with Flutter, and exploring machine learning applications.
                    </motion.p>

                    <motion.div className="flex justify-center" variants={itemVariants}>
                        <Link
                            to="contact"
                            smooth={true}
                            duration={500}
                            className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg transition-colors duration-300 items-center">
                            Work With Me
                            <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </Link>
                        <Link
                            to="projects"
                            smooth={true}
                            duration={500}
                            className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg transition-colors duration-300 items-center">
                            See My Work
                            <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Social Media Links */}
                    <motion.div className="flex mt-6" variants={itemVariants}>
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mr-4 text-gray-400 hover:text-white transition-colors duration-300"
                                aria-label={link.label}
                                whileHover={{
                                scale: 1.2
                            }}
                                whileTap={{
                                scale: 0.9
                            }}>
                                {link.icon}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Skills badges */}
                    <motion.div className="flex flex-wrap gap-2 mt-6" variants={itemVariants}>
                        {["React", "Node.js", "Flutter", "MongoDB", "JavaScript"].map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-800 text-sm rounded-full text-gray-200">
                                {skill}
                            </span>
                        ))}
                        <Link
                            to="skills"
                            smooth={true}
                            duration={500}
                            className="px-3 py-1 bg-gray-800 text-sm rounded-full text-gray-200 hover:bg-gray-700 cursor-pointer transition-colors duration-300">
                            +more
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
                    initial={{
                    opacity: 0,
                    x: 100
                }}
                    animate={{
                    opacity: 1,
                    x: 0
                }}
                    transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 15
                }}>
                    <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src="./coder.svg"/>
                </motion.div>
            </div>
        </section>
    );
}