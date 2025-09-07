import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Home/index';
import AboutUsPage from './components/About';
import ContactUsPage from './components/ContactUs/ContactUs'; // Importing the Contact Us component
import Navbar from "./components/Navbar/index";
import Footer from './components/Footer/index';
import EventsPage from './components/Events/index';
import TeamPage from './components/Members/index';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Preloader from './components/Preloader/preloader';
import ProductsPage from './components/Products/index';
import GalleryPage from './components/Gallery/index';
import RegistrationForm from "./components/Events/RegistrationForm";
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPopup from './components/Login/LoginPopup';
import AdminLogin from './components/AdminLogin/AdminLogin';
import EventManagement from './components/Admin/EventManagement'; // Import the new component

const PrivateRoute = ({ children }) => {
  const { idToken } = useAuth();
  return idToken ? children : <Navigate to="/" />;
};

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admins" />;
};

function AppContent() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { loading } = useLoading();
  const { showLoginPopup, closeLoginPopup } = useAuth();

  useEffect(() => {
    // Fake loading delay for home page
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading || loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <Navbar />
      <LoginPopup show={showLoginPopup} onClose={closeLoginPopup} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/register/:eventName" element={<PrivateRoute><RegistrationForm /></PrivateRoute>} />
        <Route path="/admins" element={<AdminLogin />} />
        <Route path="/admin/events" element={<AdminPrivateRoute><EventManagement /></AdminPrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <LoadingProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LoadingProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
