import React, { useState, useEffect } from "react";
import "./style.css";
import logo from "../../assets/logowhite.png"; // Add your logo in the 'assets' folder
import gfg from "../../assets/GeeksforGeeks.png";
import jb from "../../assets/jetbrains.png";
import JoinMintcodeForm from '../JoinMintcodeForm/JoinMintcodeForm'; // Import the new form component
import animationData from "../../assets/transition.json";
import Lottie from "react-lottie";
import CountUp from 'react-countup';

const Home = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 5000); // Show logo after 1.5 seconds
  
    return () => clearTimeout(timer);
  }, []);

  const handleJoinClick = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="home-container">
      <div className="glowing-strap"></div>
      {/* Hero Section */}
      <header className="hero">
        <div>
          <h1 className="hero-title">
            Fresh<span className="highlight"> Perspectives</span>,<br />Stronger <span className="highlight">Code</span>.
          </h1>
          <p className="hero-subtitle">
            We are MintCode, a community of passionate developers, designers, and innovators committed to pushing the boundaries of technology.
          </p> <br />
          <button className="cta-button" onClick={handleJoinClick}>Join MintCode!</button>
        </div>
        <div>
        <section className="floating-card">
            <div className="floating-icons">
              <span className="icon figma">📝</span>
              <span className="icon photoshop">｡🇯‌🇸‌</span>
            </div>
            {
              showLogo ? (
                <img src={logo} alt="MintCode Logo" className={`status fade-in`} />
              ) : (
                <Lottie
                  options={{
                    animationData: animationData,
                    loop: false,
                    autoplay: true
                  }}
                  height={222}
                  width={300}
                />
              )
            }
            {showLogo && <span>🟢</span>}
          </section>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-container">
        <div className="stat-item">
          <h2><CountUp end={5} duration={3} />+</h2>
          <p>Collaborations</p>
        </div>
        <div className="stat-item">
          <h2><CountUp end={2} duration={3} />+</h2>
          <p>Events Conducted</p>
        </div>
        <div className="stat-item">
          <h2><CountUp end={50} duration={3} />+</h2>
          <p>Community Members</p>
        </div>
        <div className="stat-item">
          <h2>2024</h2>
          <p>Year Founded</p>
        </div>
      </section>

      {/* New Sponsor Section */}
      <section className="sponsor-section">
        <h2 className="sponsor-title">Empowering Students Together</h2> <br />
        <div className="sponsor-columns">
            <div className="sponsor-column">
                <img src={gfg} alt="GeeksforGeeks Logo" className="geeksforgeeks-logo" />
              <p>Backed by GeeksforGeeks, we gain access to premium learning resources, mentorship, and exclusive coding events.</p>
            </div>
            <div className="sponsor-column">
                <img src={jb} alt="JetBrains Logo" className="jetbrains-logo" />
              <p>JetBrains supports us through the Student Empowerment Program, providing tools for aspiring developers.</p>
            </div>
        </div>
      </section>

      {/* New Sections in Separate Floating Cards */}
      <div className="columns">
        <section className="floating-card vision">
          <h2>Our <span className="highlight">Vision</span></h2>
          <p className="content"><li>Empowering Developers - We strive to build a strong coding community where students enhance their skills and turn ideas into reality.</li><br />
           <li>Innovation & Creativity - Encouraging new ideas, technologies, and solutions that push boundaries in the tech industry.</li><br />
           <li>Industry Readiness - Preparing students for future careers by exposing them to emerging technologies and best practices.</li></p>
        </section>

        <section className="floating-card mission">
          <h2>Our <span className="highlight">Mission</span></h2>
          <p className="content">
          <li>Skill Development - Organizing workshops, coding challenges, and mentorship programs to improve technical expertise.</li><br />
          <li>Real-World Experience - Encouraging hands-on projects and open-source contributions to build practical knowledge.</li><br />
          <li>Encouraging Teamwork - Promoting group projects and hackathons to enhance problem-solving and collaboration skills.</li>
          </p>
        </section>

        <section className="floating-card values">
          <h2>Our <span className="highlight">Values</span></h2>
          <p className="content">
            <li>Innovation - We embrace change, experiment with ideas, and drive technological advancements.</li><br />
            <li>Collaboration - Encouraging teamwork and knowledge-sharing to create impactful solutions.</li><br />
            <li>Inclusivity - Building a welcoming and diverse community where every voice is heard and valued.</li>
</p>
        </section>
      </div>
      
      {/* Render the JoinMintcodeForm if visible */}
      {isFormVisible && <JoinMintcodeForm onClose={handleCloseForm} />}
      
    </div>
  );
};

export default Home;
