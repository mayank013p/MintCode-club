import React from 'react';
import './style.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="welcome">
      <p className="hero-subtitle">We'd love to hear from you! Fill out the form below.</p>
      </div>
      <div className="hero-contact">
        <h1 className="hero-title">Get in Touch</h1>
      </div>
      

      <div className="floating-card-contact">
        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input type="text" id="name" name="name" placeholder="Enter your full name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name:</label>
              <input type="text" id="company" name="company" placeholder="Enter your company name" />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" placeholder="Enter the subject" required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Enter your message" required></textarea>
          </div>

          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </div>

      <div className="contact-details">
        <h2>Contact Details</h2>
        <p>Phone: +91 9876543210</p>
        <p>Email: contact@gmail.com</p>
        <p>Address: 302012 Sitapura, Jaipur IND</p>
      </div>
    </div>
  );
};

export default ContactUs;
