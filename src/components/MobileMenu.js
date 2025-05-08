import React, { useState } from "react";
import { Link } from "react-scroll";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 left-0 bg-gray-800 shadow-md py-2 px-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="text-white hover:text-green-400 py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="text-white hover:text-green-400 py-2"
              onClick={toggleMenu}
            >
              Past Work
            </Link>
            <Link
              to="skills"
              smooth={true}
              duration={500}
              className="text-white hover:text-green-400 py-2"
              onClick={toggleMenu}
            >
              Skills
            </Link>
            <Link
              to="testimonials"
              smooth={true}
              duration={500}
              className="text-white hover:text-green-400 py-2"
              onClick={toggleMenu}
            >
              Testimonials
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="text-white hover:text-green-400 py-2"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <a
              href="https://drive.google.com/file/d/1ofk7VoNAs9g5Byw2bp4yTMia9_s3j486/view"
              className="text-white hover:text-green-400 py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </div>
  );
}