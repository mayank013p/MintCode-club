import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FaLink, FaInstagram, FaLinkedinIn, } from "react-icons/fa";
import logo from "../../assets/logowhite.png";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <img src={logo} alt="MintCode Logo" className="footer-logo" />
          <p>
             A community of passionate developers, designers, and innovators.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/members">Members</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="mailto:contact@mintcode.club">contact@mintcode.club</a></li>
            <li><p>Global Institute of Technology (GIT) in Jaipur is ITS-1, IT Park EPIP, Sitapura, JAIPUR-302022 (Raj.)</p></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://mint-code-club-rovt.vercel.app/" target="_blank" rel="noopener noreferrer"><FaLink /></a>
            <a href="https://www.instagram.com/mintcode2025/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/105040951/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 <strong>MintCode</strong>. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
