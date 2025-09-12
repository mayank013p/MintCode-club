import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
const HomePage = lazy(() => import('./components/Home/index'));
const AboutUsPage = lazy(() => import('./components/About'));
const ContactUsPage = lazy(() => import('./components/ContactUs/ContactUs')); // Importing the Contact Us component
import Navbar from "./components/Navbar/index";
import Footer from './components/Footer/index';
const EventsPage = lazy(() => import('./components/Events/index'));
const TeamPage = lazy(() => import('./components/Members/index'));
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Preloader from './components/Preloader/preloader';
const ProductsPage = lazy(() => import('./components/Products/index'));
const GalleryPage = lazy(() => import('./components/Gallery/index'));
const RegistrationForm = lazy(() => import("./components/Events/RegistrationForm"));
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
const LoginPopup = lazy(() => import('./components/Login/LoginPopup'));
const AdminLogin = lazy(() => import('./components/AdminLogin/AdminLogin'));
const EventManagement = lazy(() => import('./components/Admin/EventManagement')); // Import the new component

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
  const { showLoginPopup, closeLoginPopup, onLoginSuccess } = useAuth();

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
      <Suspense fallback={<Preloader />}>
        <LoginPopup show={showLoginPopup} onClose={closeLoginPopup} onLoginSuccess={onLoginSuccess} />
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
      </Suspense>
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
