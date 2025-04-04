import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/index';
import AboutUsPage from './components/About';
import ContactUsPage from './components/ContactUs/ContactUs'; // Importing the Contact Us component
import Navbar from "./components/Navbar/index";
import Footer from './components/Footer/index';
import EventsPage from './components/Events/index';
import TeamPage from './components/Members/index';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} /> 
        <Route path="/events" element={<EventsPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
