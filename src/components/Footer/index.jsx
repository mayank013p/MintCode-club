import React from "react";
import "./style.css";
import { FaLink, FaInstagram, FaLinkedinIn, } from "react-icons/fa";
import logo from "../../assets/logowhite.png";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-section footer-left">
        <p>© 2025 <strong>MintCode</strong></p>
      </div>

      <div className="footer-section footer-center">
        <img src={logo} alt="MintCode Logo" />
      </div>

      <div className="footer-section footer-right">
        <a href="#"><FaLink /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaLinkedinIn /></a>
      </div>
    </footer>
  );
};

export default Footer;
