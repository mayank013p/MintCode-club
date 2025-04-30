import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/index';
import AboutUsPage from './components/About';
import ContactUsPage from './components/ContactUs/ContactUs'; // Importing the Contact Us component
import Navbar from "./components/Navbar/index";
import Footer from './components/Footer/index';
import EventsPage from './components/Events/index';
import TeamPage from './components/Members/index';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Preloader from './components/Preloader/preloader';
import GeminiPage from './components/Geminiai/geminiai';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Preloader />;
  }
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} /> 
        <Route path="/events" element={<EventsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/mintai" element={<GeminiPage />} />
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
