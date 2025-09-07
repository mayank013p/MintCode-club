import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <p>MintCode is brewing...</p>
        <p className="subtitle">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
