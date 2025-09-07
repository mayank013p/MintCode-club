import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPopup.css';

const LoginPopup = ({ show, onClose, onLoginSuccess }) => {
  const { login } = useAuth();

  if (!show) {
    return null;
  }

  return (
    <div className="login-popup-overlay" onClick={onClose}>
      <div className="login-popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login Required</h2>
        <p>Please log in with your Google account to continue.</p>
        <div className="google-login-container">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              login(credentialResponse);
              if (onLoginSuccess) {
                onLoginSuccess();
              }
              onClose();
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            theme="filled_black"
            size="large"
          />
        </div>
        <button className="close-popup-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginPopup;
