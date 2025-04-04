import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/logowhite.png";
import RegistrationForm from "./RegistrationForm";
import { title } from "framer-motion/client";
import hackthemint from "../../assets/Hack-The-Mint.jpg";
import LeaderboardPopup from "./LeaderboardPopup";

const eventsData = [
  {
    id: 1,
    title: "Hack-The-Mint",
    date: "March 5, 2025",
    type: "past",
    eventType: "team",
    memberLimit: 4,  
    banner: hackthemint,
    description: "On the occasion of National Science Day, MintCode Club, in collaboration with GIT, GeeksforGeeks, and Code Warriors, presents Hack The Mint—an exclusive coding event for 2nd-year students of GIT.",
    deadline: "2025-03-04 23:59",
    venue: "Git Labs, Global Institute fo technology, Jaipur, 302022 IND",
    Rules: [
      "Eligibility: Only 2nd-year students of GIT are allowed to participate.",
      "Fair Play: Participants must not use external help, plagiarism, or AI-based tools during the competition.",
      "Decision Finality: Judges' decisions are final and cannot be challenged.",
      "Time Management: Complete the coding challenges within the given timeframe."
    ],
    Benefits: ["Recognition & Opportunities",
             "Stand out in the crowd",
             "boost your resume", 
             "and open doors to internships, hackathons, and job opportunities."
    ],
    Whyparticipate: ["Become a part of the MintCode Club and engage with a community of like-minded coders.",
                    "Sharpen your coding and problem-solving skills through hands-on challenges.",
                    "Get exclusive access to tech workshops, mentorship sessions, and industry insights to enhance your technical expertise.!"
                  ],
    Note: ["This is not just a competition—it’s an opportunity to shape your future in tech!",
          "Participants must register in advance to secure their spot.",
          "Winners will receive special recognition and opportunities for further learning.",
          "Be ready to code, learn, and innovate!"
    ]
  },
  {
    id: 2,
    title: "HackMint 1.0",
    date: "April 20, 2025",
    type: "upcoming",
    eventType: "team", // 👈 NEW
    memberLimit: 4,    // 👈 NEW (includes leader)
    banner: logo,
    description: "Stay Tuned!",
    deadline: "2025-06-6 23:59",
    venue: "Online",
    Rules: ["Stay Tuned!"],
    Benefits: ["Stay Tuned!"],
    Whyparticipate: ["Stay Tuned!"],
    Note: ["Stay Tuned!"]
  },
  // {
  //   id: 3,
  //   title: "AI Conference",
  //   date: "April 1, 2024",
  //   type: "past",
  //   banner: logo,
  //   description: "A thrilling 24-hour coding competition. Everyone is welcome! Dont miss the opprtunity A thrilling 24-hour coding competition. Everyone is welcome! Dont miss the opprtunity",
  //   deadline: "March 30, 2024",
  //   venue: "Innovation Hub",
  //   Rules: "Real-World Challenges: Tackle real-world problems that have the potential to make a significant impact on business and society.Expert Guidance: Receive mentorship from industry leaders and experts.Learning Opportunities: Expand your knowledge through workshops and seminars.Innovative Solutions: Push the boundaries of what's possible and shape the future of technology.",
  //   Benefits: "Solve Real-World Problems: Tackle complex issues that have a tangible impact on businesses and society.Learn and Grow: Engage in workshops, training sessions, and mentorship opportunities to enhance your skills.Network and Collaborate: Connect with like-minded professionals and industry experts.Win Exciting Prizes: Showcase your creativity and innovation, and compete for amazing rewards and recognition.",
  //   Whyparticipate: "Don’t miss this incredible opportunity!Register now to join us at Hack the Future: A Gen AI Sprint Powered by Data and be part of a community that is shaping the future through Data and AI!",
  //   Note: "Welcome to Hack the Future: A Gen AI Sprint Powered by Data! This exciting hackathon brings together innovative minds from across India to tackle some of the most pressing challenges using the power of Data and Artificial Intelligence. Whether you're a seasoned data scientist or a consultant, a budding AI enthusiast, or a creative problem-solver, this event offers a unique opportunity to collaborate, learn, and innovate."
  // },
];

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registeringEvent, setRegisteringEvent] = useState(null); 
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const filteredEvents = eventsData.filter(event =>
    (selectedFilter === "all" || event.type === selectedFilter) &&
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setRegisteringEvent(null);  // Ensure registration is not open
  };
  const openRegistrationForm = (event) => {
    setRegisteringEvent(event);
    setSelectedEvent(null);  // Ensure details popup is not open
    setShowRegistration(true);
  };
  const calculateCountdown = (eventDate) => {
    const eventTime = new Date(eventDate).getTime();
    const currentTime = new Date().getTime();
    const diff = eventTime - currentTime;
  
    if (diff <= 0) return "Registration Ended!";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  return (
    <div className="events-container">
      {/* Hero Section */}
      <div className="events-hero">
        <h1>Our <span>Events</span></h1>
        <p>Stay updated with our latest hackathons, contests, and conferences.</p>
      </div>

      {/* Filters and Search Box */}
      <div className="event-controls">
        {/* Search Box */}
        <input
          type="text"
          className="search-box"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Filter Buttons */}
        <div className="event-filters">
          {["all", "upcoming", "live", "past"].map(filter => (
            <button
              key={filter}
              className={`filter-btn ${selectedFilter === filter ? "active" : ""}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        
      </div>

      {/* Event Grid */}
      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              {/* Left Section - Event Details */}
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-meta"><strong>Date:</strong> {event.date}</p>
                <p className="event-meta"><strong>Last Date to register: </strong> {event.deadline}</p>

                <p className="event-meta"><strong>Venue:</strong> {event.venue}</p>
                <div className="event-buttons">
                  <button className="details-btn" onClick={() => openEventDetails(event)}>
  More Details
</button>

{new Date(event.deadline).getTime() > new Date().getTime() ? (
  // <button className="register-btn" onClick={() => openRegistrationForm(event)}>
  //   Register Now
  // </button>
  <button className="register-btn">
  Register Now
</button>
) : (
  <button className="leaderboard-btn" onClick={() => setShowLeaderboard(event)}>Leaderboard</button>
)}

                </div>
              </div>

              {/* Right Section - Banner & Countdown */}
              <div className="event-banner-container">
                <img src={event.banner} alt={event.title} className="event-banner" />
                <p className="countdown">{calculateCountdown(event.date)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events-message">No matching events found.</p>
        )}
      </div>

      {/* Event Details Popup */}
      {selectedEvent && (
        <div className="popup-overlay" onClick={() => setSelectedEvent(null)}>
          
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <div className="popup-content-detail">
            <div>
            <img src={selectedEvent.banner} alt={selectedEvent.title} className="popup-banner" />
            </div>
            <div>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Registration Deadline:</strong> {selectedEvent.deadline}</p>
            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            </div>
          </div>
          <div className="popup-event-more-details">
          <p><strong>Rules:</strong><ul>{selectedEvent.Rules.map((rule, index) => (<li key={index}>{rule}</li>))}</ul></p>
          <p><strong>Why Particpate:</strong><ul>{selectedEvent.Whyparticipate.map((Whyparticipate, index) => (<li key={index}>{Whyparticipate}</li>))}</ul></p>
          <p><strong>Benefits:</strong><ul>{selectedEvent.Benefits.map((benefits, index) => (<li key={index}>{benefits}</li>))}</ul></p>
          <p><strong>Note:</strong><ul>{selectedEvent.Note.map((note, index) => (<li key={index}>{note}</li>))}</ul></p>
          </div>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {showRegistration && (
        <RegistrationForm selectedEvent={registeringEvent} onClose={() => setShowRegistration(false)} />
      )}

      {/* Leaderboard Popup */}
      {showLeaderboard && (
        <LeaderboardPopup event={showLeaderboard} onClose={() => setShowLeaderboard(null)} />
      )}
    </div>
  );
};

export default Events;
