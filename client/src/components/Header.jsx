import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center px-5 py-3 bg-black text-white relative z-20">
      {/* Hamburger Menu for Mobile */}
      <div
        className={`flex flex-col gap-1.5 cursor-pointer md:hidden ${mobileMenuOpen ? "space-y-0" : ""}`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`w-6 h-0.5 bg-white rounded transition-transform duration-300 ${
            mobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-white rounded transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-white rounded transition-transform duration-300 ${
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></div>
      </div>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden md:flex list-none gap-6">
        <li>
          <Link
            to="/home"
            className="text-white font-medium relative group hover:text-gray-400 transition-colors duration-300"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/movies"
            className="text-white font-medium relative group hover:text-gray-400 transition-colors duration-300"
          >
            Movies
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white font-medium relative group hover:text-gray-400 transition-colors duration-300"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className="text-white font-medium relative group hover:text-gray-400 transition-colors duration-300"
          >
            Payment History
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-black text-white p-5 rounded-b-lg shadow-lg transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/home"
          className="block py-2 text-white hover:text-gray-400 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="block py-2 text-white hover:text-gray-400 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          Movies
        </Link>
        <Link
          to="/about"
          className="block py-2 text-white hover:text-gray-400 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          About
        </Link>
        <Link
          to="/myorder"
          className="block py-2 text-white hover:text-gray-400 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          My Order
        </Link>
      </div>

      {/* Search Bar */}
      <div
        className={`flex items-center rounded-full bg-gray-700 px-3 py-1.5 transition-all duration-300 ${
          searchFocused ? "w-80 bg-gray-600 shadow-lg" : "w-52"
        } md:w-48 lg:w-52 md:focus-within:w-64 lg:focus-within:w-80`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="border-none outline-none bg-transparent text-white placeholder-gray-400 placeholder-opacity-80 w-full px-2 py-1 transition-colors duration-300"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <button type="button" className="bg-transparent border-none text-white cursor-pointer p-1 hover:bg-gray-500 hover:rounded-full transition-all duration-300">
          <BiSearch className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Icon (Desktop) */}
      <div className="hidden md:flex items-center gap-5">
        <Profile />
      </div>
    </nav>
  );
};

export default Header;