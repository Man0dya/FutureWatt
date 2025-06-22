import React, { useState, useEffect } from "react";
import "./Header.css";
import futureWatt from "./FutureWatt1.png";
import { Link, useLocation } from "react-router-dom"; // Add useLocation

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Get the current pathname using useLocation
  const { pathname } = useLocation();

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever pathname changes
  }, [pathname]); // Dependency on pathname ensures this runs on navigation

  // Check login status based on customerId
  const checkLoginStatus = () => {
    const customerId = localStorage.getItem("customerId");
    setIsLoggedIn(!!customerId);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/">
          <img src={futureWatt} alt="FutureWatt Logo" className="nav-logo" />
        </Link>

        {/* Hamburger Menu Button */}
        <button className="nav-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>

          <li
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link to="/Packages" onClick={() => setMenuOpen(false)}>Products</Link>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-section">
                  <Link to="/Packages/OffGrid" onClick={() => setMenuOpen(false)}>Off Grid Solar</Link>
                </li>
                <li className="dropdown-section">
                  <Link to="/Packages/OnGrid" onClick={() => setMenuOpen(false)}>On Grid Solar</Link>
                </li>
                <li className="dropdown-section">
                  <Link to="/Packages/HotWater" onClick={() => setMenuOpen(false)}>Hot Water</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/AboutUs" onClick={() => setMenuOpen(false)}>About Us</Link>
          </li>
          <li>
            <Link to="/ContactUs" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </li>
        </ul>

        {/* Conditionally render button based on login status */}
        {isLoggedIn ? (
          <button className="sign-up-btn">
            <Link to="/CustomerProfile" onClick={() => setMenuOpen(false)}>My Profile</Link>
          </button>
        ) : (
          <button className="sign-up-btn">
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;