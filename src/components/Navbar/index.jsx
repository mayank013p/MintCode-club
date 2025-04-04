import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import logo from "../../assets/logowhite.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="MintCode Logo" />
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/events" className={location.pathname === "/events" ? "active" : ""}>Events</Link>
        <Link to="/team" className={location.pathname === "/team" ? "active" : ""}>Members</Link>
        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About Us</Link>
        {/* <Link to="/resources" className={location.pathname === "/resources" ? "active" : ""}>Resources</Link>
        <Link to="/projects" className={location.pathname === "/projects" ? "active" : ""}>Projects</Link> */}
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
      <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact us</Link>
      </div>

      <div className="navbar-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>
    </nav>
  );
};

export default Navbar;