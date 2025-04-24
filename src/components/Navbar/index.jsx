import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import logo from "../../assets/logowhite.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import GeminiPage from "../Geminiai/geminiai";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setMenuOpen(false); // Auto-close on link click
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={handleLinkClick} className={location.pathname === "/" ? "active" : ""}>
          <img src={logo} alt="MintCode Logo" />
        </Link>
      </div>

      {/* Main Links */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={handleLinkClick} className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/events" onClick={handleLinkClick} className={location.pathname === "/events" ? "active" : ""}>Events</Link>
        <Link to="/team" onClick={handleLinkClick} className={location.pathname === "/team" ? "active" : ""}>Members</Link>
        <Link to="/gemini" onClick={handleLinkClick} className={location.pathname === "/gemini" ? "active" : ""}>Mint-Ai</Link>
        <Link to="/about" onClick={handleLinkClick} className={location.pathname === "/about" ? "active" : ""}>About Us</Link>
      </div>

      {/* Contact in separate container, still responsive */}
      <div className={`navbar-contact ${menuOpen ? "open" : ""}`}>
        <Link to="/contact" onClick={handleLinkClick} className={location.pathname === "/contact" ? "active" : ""}>
          Contact us
        </Link>
      </div>

      {/* Hamburger icon */}
      <div className="navbar-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>
    </nav>
  );
};

export default Navbar;
