import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faPaintBrush, faCode } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
  return (
    <div className="products-page">
      <div className="coming-soon-container">
        <h1 className="main-title">Coming Soon!</h1>
        <p className="subtitle">We're crafting something amazing for you. Our new products are on their way.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <FontAwesomeIcon icon={faRocket} className="feature-icon" />
            <h3 className="feature-title">Innovative Features</h3>
            <p className="feature-description">Packed with the latest technology to enhance your experience.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faPaintBrush} className="feature-icon" />
            <h3 className="feature-title">Sleek Design</h3>
            <p className="feature-description">A modern and intuitive user interface for seamless interaction.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faCode} className="feature-icon" />
            <h3 className="feature-title">Robust Performance</h3>
            <p className="feature-description">Built to be fast, reliable, and scalable for all your needs.</p>
          </div>
        </div>

 <div className="newsletter-signup">
          <h3 className="newsletter-title">Stay Updated!</h3>
          <p className="newsletter-subtitle">Be the first to know when we launch.</p>
          
        </div>
      </div>
    </div>
  );
};

export default Products;
