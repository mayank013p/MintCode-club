import React, { useState, useEffect } from "react";
import "./style.css";
import logo from "../../assets/logowhite.png";
import RegistrationForm from "./RegistrationForm";
import LeaderboardPopup from "./LeaderboardPopup";
import hackthemint from "../../assets/Hack-The-Mint.jpg";
import animationData from "../../assets/nodata.json"; // Make sure to update the path to your Lottie JSON

import Lottie from "react-lottie"; // Import the Lottie component

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registeringEvent, setRegisteringEvent] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.eventdate).toDateString(),
          deadline: new Date(event.registrationdeadline).toDateString(),
          type: new Date(event.eventdate) < new Date() ? "past" : "upcoming",
          eventType: event.eventtype,
          memberLimit: event.memberlimit || 1,
          banner: event.bannerimage || hackthemint,
          description: event.description,
          venue: event.venue,
          Rules: event.rules || [],
          Benefits: event.benefits || [],
          Whyparticipate: event.whyparticipate || [],
          Note: event.note || []
        }));

        setEventsData(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const filteredEvents = eventsData.filter((event) =>
    (selectedFilter === "all" || event.type === selectedFilter) &&
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setRegisteringEvent(null);
  };

  const openRegistrationForm = (event) => {
    setRegisteringEvent(event);
    setSelectedEvent(null);
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
      <div className="events-hero">
        <h1>Our <span>Events</span></h1>
        <p>Stay updated with our latest hackathons, contests, and conferences.</p>
      </div>

      <div className="event-controls">
        <input
          type="text"
          className="search-box"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="event-filters">
          {["all", "upcoming", "live", "past"].map((filter) => (
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

      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-meta"><strong>Date:</strong> {event.date}</p>
                <p className="event-meta"><strong>Last Date to register:</strong> {event.deadline}</p>
                <p className="event-meta"><strong>Venue:</strong> {event.venue}</p>
                <div className="event-buttons">
                  <button className="details-btn" onClick={() => openEventDetails(event)}>More Details</button>

                  {new Date(event.deadline).getTime() > new Date().getTime() ? (
                    <button className="register-btn" onClick={() => openRegistrationForm(event)}>Register Now</button>
                  ) : (
                    <button className="leaderboard-btn" onClick={() => setShowLeaderboard(event)}>Leaderboard</button>
                  )}
                </div>
              </div>

              <div className="event-banner-container">
                <img src={event.banner} alt={event.title} className="event-banner" />
                <p className="countdown">{calculateCountdown(event.date)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events-container">
            <Lottie
              options={{
                animationData: animationData,
                loop: true,
                autoplay: true,
              }}
              height={200}
              width={200}
            />
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="popup-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <div className="popup-content-detail">
              <div><img src={selectedEvent.banner} alt={selectedEvent.title} className="popup-banner" /></div>
              <div>
                <p>Description:<span> {selectedEvent.description}</span></p>
                <p>Date:<span> {selectedEvent.date}</span></p>
                <p>Registration Deadline:<span> {selectedEvent.deadline}</span></p>
                <p>Venue:<span> {selectedEvent.venue}</span></p>
              </div>
            </div>
            <div className="popup-event-more-details">
              <p>Rules:<ul>{selectedEvent.Rules.map((rule, i) => (<li key={i}>{rule}</li>))}</ul></p>
              <p>Why Participate:<ul>{selectedEvent.Whyparticipate.map((why, i) => (<li key={i}>{why}</li>))}</ul></p>
              <p>Benefits:<ul>{selectedEvent.Benefits.map((benefit, i) => (<li key={i}>{benefit}</li>))}</ul></p>
              <p>Note:<ul>{selectedEvent.Note.map((note, i) => (<li key={i}>{note}</li>))}</ul></p>
            </div>
          </div>
        </div>
      )}

      {showRegistration && (
        <RegistrationForm selectedEvent={registeringEvent} onClose={() => setShowRegistration(false)} />
      )}

      {showLeaderboard && (
        <LeaderboardPopup event={showLeaderboard} onClose={() => setShowLeaderboard(null)} />
      )}
    </div>
  );
};

export default Events;
