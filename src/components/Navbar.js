// src/components/Navbar.js
import { ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-scroll";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="bg-gray-800 dark:bg-gray-800 light:bg-white md:sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="title-font font-medium text-white mb-4 md:mb-0 flex items-center justify-between w-full md:w-auto">
          <Link 
            to="about" 
            smooth={true} 
            duration={500} 
            className="ml-3 text-xl cursor-pointer"
          >
            MD Shaikh Rahman
          </Link>
          <MobileMenu />
        </div>
        <nav className="hidden md:flex md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex-wrap items-center text-base justify-center">
          <Link 
            to="projects" 
            smooth={true} 
            duration={500}
            className="mr-5 hover:text-white cursor-pointer"
          >
            Past Work
          </Link>
          {/* Rest of your nav links */}
        </nav>
        <div className="hidden md:flex items-center">
        <div className="mr-4">
          <ThemeToggle />
        </div>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="inline-flex items-center bg-gray-800 dark:bg-gray-800 light:bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 cursor-pointer ml-4"
          >
            Hire Me
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </header>
  );
}