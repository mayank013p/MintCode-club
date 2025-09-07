import React, { createContext, useState, useContext, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('idToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIdToken(storedToken);
    }
  }, []);

  const login = (credentialResponse) => {
    const id_token = credentialResponse.credential;
    // Basic decoding to get user info. For production, you'd verify the token on the backend.
    const userObject = JSON.parse(atob(id_token.split('.')[1]));
    setUser(userObject);
    setIdToken(id_token);
    localStorage.setItem('user', JSON.stringify(userObject));
    localStorage.setItem('idToken', id_token);
  };

  const logout = () => {
    googleLogout();
    setUser(null);
    setIdToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('idToken');
  };

  const openLoginPopup = () => setShowLoginPopup(true);
  const closeLoginPopup = () => setShowLoginPopup(false);

  return (
    <AuthContext.Provider value={{ user, idToken, login, logout, showLoginPopup, openLoginPopup, closeLoginPopup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
