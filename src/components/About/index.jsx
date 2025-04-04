import React from "react";
import "./style.css"; // Link to CSS
import logo from "../../assets/logowhite.png";
import linkedin from "../../assets/LI-Logo.png";
import suhani from "../../assets/Suhani.jpg";
import divyanshi from "../../assets/Divyanshi.jpg";
import ritika from "../../assets/Ritika.jpg";
import sachin from "../../assets/Sachin.jpg";
import mayank from "../../assets/Mayank.jpg"

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Mayank Aitan",
      role: "Organizer",
      linkedin: "https://www.linkedin.com/in/mayank-aitan-a55923254/",
      photo: mayank,
    },
    {
      name: "Divyanshi Shekhawat",
      role: "Co-Organizer",
      linkedin: "https://www.linkedin.com/in/divyanshi-shekhawat-848b67249/",
      photo: divyanshi,
    },
    {
      name: "Suhani Mathur",
      role: "Designing Head",
      linkedin: "https://www.linkedin.com/in/suhani-mathur-828340258/",
      photo: suhani,
    },
    {
      name: "Ritika Suman",
      role: "Contest Head",
      linkedin: "https://www.linkedin.com/in/ritikasuman/",
      photo: ritika,
    },
    {
      name: "Sachin Gupta",
      role: "Technical Head",
      linkedin: "https://www.linkedin.com/in/sachingupta313/",
      photo: sachin,
    },
  ];
  return (
    <section className="about-section">
      <div className="about-content">
        <h2><span>About</span> Us</h2>
        <p>
          Mintcode is a community dedicated to fostering innovation and technical excellence. 
          We empower students with hands-on experience in software development, UI/UX design, 
          and problem-solving through structured learning and real-world projects.
        </p>
        <p>
          Our mission is to bridge the gap between theoretical knowledge and industry 
          practices, providing opportunities to work on meaningful projects.
        </p>
        <p>
          Whether you're passionate about coding, design, or logical problem-solving, 
          Mintcode is the perfect place to collaborate and grow.
        </p>
      </div>

      <div className="card-container">
        <div className="about-card">
          <h3>Development</h3>
          <p>We focus on full-stack development, mobile apps, and emerging technologies.</p>
        </div>
        <div className="about-card">
          <h3>Designing</h3>
          <p>Creating intuitive UI/UX experiences for the best user interactions.</p>
        </div>
        <div className="about-card">
          <h3>Logic Building</h3>
          <p>Strengthening problem-solving skills through DSA and competitive coding.</p>
        </div>
      </div>

      <div className="core-team">
        <h2>Meet Our <span>Core Team</span></h2>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.photo} alt={member.name} className="team-photo" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-btn">
                <img src={linkedin} alt="LinkedIn" className="linkedin-logo" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
