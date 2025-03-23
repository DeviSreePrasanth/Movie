import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaFilm } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScroll = (sectionId) => {
    // Navigate to /home first if not already there
    navigate("/home");
    
    // Wait for navigation to complete, then scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md text-white py-4 px-6 z-40">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <FaFilm className="w-8 h-8 text-cyan-500 animate-pulse" />
          <span className="hidden lg:inline-block text-2xl font-bold tracking-tight text-white hover:text-cyan-500 transition-colors duration-300">
            CineVerse
          </span>
        </Link>

        <div className="hidden md:flex items-center justify-between w-full max-w-5xl mx-auto lg:space-x-12">
          <ul className="flex items-center space-x-6 lg:space-x-10 text-lg font-semibold">
            <li>
              <button
                onClick={() => handleScroll("movie-center")}
                className="relative text-white px-3 py-1 rounded-md hover:text-cyan-500 hover:bg-gray-800/50 transition-all duration-300 group"
              >
                Home
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("movie-section")}
                className="relative text-white px-3 py-1 rounded-md hover:text-cyan-500 hover:bg-gray-800/50 transition-all duration-300 group"
              >
                Movies
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("about-us")}
                className="relative text-white px-3 py-1 rounded-md hover:text-cyan-500 hover:bg-gray-800/50 transition-all duration-300 group"
              >
                About
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </button>
            </li>
            <li>
              <Link
                to="/history"
                className="relative text-white px-3 py-1 rounded-md hover:text-cyan-500 hover:bg-gray-800/50 transition-all duration-300 group"
              >
                Payment History
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </Link>
            </li>
          </ul>

          <div
            className={`flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-300 ${
              searchFocused ? "w-72 bg-gray-700/70 shadow-md" : "w-40"
            } md:w-48 lg:w-56 md:focus-within:w-64 lg:focus-within:w-72`}
          >
            <input
              type="text"
              placeholder="Search Movies..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full text-sm font-medium transition-colors duration-300"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <button
              type="button"
              className="text-gray-300 hover:text-cyan-500 transition-colors duration-300 p-1"
            >
              <BiSearch className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none p-2 rounded-md hover:bg-gray-800/50 transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        <div
          className={`absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md text-white p-6 shadow-xl rounded-b-lg transform transition-all duration-300 md:hidden ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex justify-center mb-4">
            <div
              className={`flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-300 ${
                mobileSearchFocused ? "w-full max-w-sm bg-gray-700/70 shadow-md" : "w-full max-w-xs"
              }`}
            >
              <input
                type="text"
                placeholder="Search Movies..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full text-sm font-medium transition-colors duration-300"
                onFocus={() => setMobileSearchFocused(true)}
                onBlur={() => setMobileSearchFocused(false)}
              />
              <button
                type="button"
                className="text-gray-300 hover:text-cyan-500 transition-colors duration-300 p-1"
              >
                <BiSearch className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={() => handleScroll("movie-center")}
            className="block py-3 px-4 text-lg font-medium hover:bg-gray-800 hover:text-cyan-500 rounded-md transition-all duration-300 w-full text-left"
          >
            Home
          </button>
          <button
            onClick={() => handleScroll("movie-section")}
            className="block py-3 px-4 text-lg font-medium hover:bg-gray-800 hover:text-cyan-500 rounded-md transition-all duration-300 w-full text-left"
          >
            Movies
          </button>
          <button
            onClick={() => handleScroll("about-us")}
            className="block py-3 px-4 text-lg font-medium hover:bg-gray-800 hover:text-cyan-500 rounded-md transition-all duration-300 w-full text-left"
          >
            About
          </button>
          <Link
            to="/history"
            className="block py-3 px-4 text-lg font-medium hover:bg-gray-800 hover:text-cyan-500 rounded-md transition-all duration-300"
            onClick={toggleMobileMenu}
          >
            Payment History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;