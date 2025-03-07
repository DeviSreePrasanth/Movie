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
    <>
      <style>
        {`
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: black;
            color: #ffffff;
            position: relative;
          }

          .nav-links {
            display: flex;
            list-style: none;
            gap: 20px;
            position: relative;
          }

          .nav-links li {
            color: inherit;
            font-weight: 500;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: color 0.4s ease;
          }

          .nav-links li::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #ab0a10;
            transform: scaleX(0);
            transform-origin: bottom left;
            transition: transform 0.6s ease-out;
          }

          .nav-links li:hover::before {
            transform: scaleX(1);
          }

          .nav-links li:hover {
            color: #a7a9be;
          }

          .search-bar {
            display: flex;
            align-items: center;
            border-radius: 50px;
            background-color: #333;
            padding: 5px;
            transition: width 0.6s ease-out, background-color 0.4s ease, box-shadow 0.4s ease-out;
            width: 200px;
          }

          .search-bar.focused {
            width: 350px;
            background-color: #444;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
          }

          .search-bar input {
            border: none;
            outline: none;
            background-color: transparent;
            color: #ffffff;
            padding: 5px 10px;
            border-radius: 50px;
            width: 100%;
            transition: color 0.3s ease;
          }

          .search-bar input::placeholder {
            color: #a7a9be;
            opacity: 0.8;
            transition: color 0.3s ease;
          }

          .search-bar button {
            background: transparent;
            border: none;
            color: #ffffff;
            cursor: pointer;
            margin-left: 5px;
            padding: 5px;
            transition: color 0.3s ease, background-color 0.3s ease;
          }

          .search-bar button:hover {
            color: #a7a9be;
            background-color: rgba(255, 255, 255, 0.1);
          }

          .nav-icons {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .icon {
            width: 24px;
            height: 24px;
            color: inherit;
            cursor: pointer;
            transition: color 0.3s ease, box-shadow 0.3s ease;
          }

          .icon:hover {
            color: #a7a9be;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }

          .hamburger-menu {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            align-items: center;
          }

          .hamburger-menu div {
            width: 25px;
            height: 3px;
            background-color: white;
            border-radius: 3px;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .hamburger-menu.active div:nth-child(1) {
            transform: rotate(45deg) translate(5px, 6px);
          }

          .hamburger-menu.active div:nth-child(2) {
            opacity: 0;
          }

          .hamburger-menu.active div:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -6px);
          }

          .mobile-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: black;
            color: #ffffff;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            z-index: 1000;
          }

          .mobile-menu.active {
            display: block;
          }

          .mobile-menu a {
            display: block;
            padding: 10px 0;
            color: #ffffff;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .mobile-menu a:hover {
            color: #a7a9be;
          }

          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }

            .nav-icons {
              display: none;
            }

            .hamburger-menu {
              display: flex;
              align-items: center;
              position: absolute;
              top: 50%;
              right: 20px;
              transform: translateY(-50%);
            }

            .header {
              flex-direction: column;
              align-items: flex-start;
            }
          }

          @media (max-width: 600px) {
            .search-bar {
              width: calc(100% - 50px);
              margin-top: 10px;
            }

            .search-bar.focused {
              width: calc(100% - 50px);
            }

            .hamburger-menu {
              display: flex;
              align-items: center;
              position: absolute;
              top: 50%;
              right: 20px;
              transform: translateY(-50%);
            }
          }
        `}
      </style>
      <nav className="header">
        <div
          className={`hamburger-menu ${mobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            <li>Home</li>
          </Link>
          <Link to="/movies" style={{ textDecoration: "none", color: "white" }}>
            <li>Movies</li>
          </Link>
          <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
            <li>About</li>
          </Link>
          <Link
            to="/history"
            style={{ textDecoration: "none", color: "white" }}
          >
            <li>Payment History</li>
          </Link>
        </ul>
        <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/home" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/movies" onClick={toggleMobileMenu}>
            Movies
          </Link>
          <Link to="/about" onClick={toggleMobileMenu}>
            About
          </Link>
          <Link to="/myorder" onClick={toggleMobileMenu}>
            My Order
          </Link>
        </div>
        <div className={`search-bar ${searchFocused ? "focused" : ""}`}>
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button type="button">
            <BiSearch className="icon search-icon" />
          </button>
        </div>
        <div className="nav-icons">
          <Profile />
        </div>
      </nav>
    </>
  );
};

export default Header;
