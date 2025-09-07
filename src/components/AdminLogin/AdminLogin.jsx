import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logowhite.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/admin/login`, {
        email,
        password,
      });

      const { token } = response.data;
      // Save the token to localStorage
      localStorage.setItem('adminToken', token);

      // Redirect to the admin event management page
      navigate('/admin/events');
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
      console.error('Admin login error:', err);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-form-container">
        <img src={logo} alt="MintCode Logo" className="admin-login-logo" />
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="admin-login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
