import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import logo from "../../assets/logowhite.png";
import LeaderboardPopup from "./LeaderboardPopup";
import EventDetailsPopup from "./EventDetailsPopup";
import hackthemint from "../../assets/Hack-The-Mint.jpg";
import animationData from "../../assets/nodata.json";

import Lottie from "react-lottie";
import { useLoading } from "../../contexts/LoadingContext";
import LoadingSpinner from "../LoadingSpinner";
import { useAuth } from "../../contexts/AuthContext";

const Events = () => {
  const navigate = useNavigate();
  const { idToken, openLoginPopup } = useAuth();
  const [eventsData, setEventsData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleEventsCount, setVisibleEventsCount] = useState(4);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        const sortedEvents = data.sort((a, b) => new Date(b.eventdate) - new Date(a.eventdate));
        const formattedEvents = sortedEvents.map((event) => ({
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
          rules: event.rules || [],
          benefits: event.benefits || [],
          whyparticipate: event.whyparticipate || [],
          note: event.note || []
        }));

        setEventsData(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });

    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = eventsData.filter((event) =>
    (selectedFilter === "all" || event.type === selectedFilter) &&
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openRegistrationForm = (event) => {
    if (idToken) {
      navigate(`/register/${event.title}`, { state: { event } });
    } else {
      openLoginPopup();
    }
  };

  const handleLoadMore = () => {
    setVisibleEventsCount(prevCount => prevCount + 4);
  };

  const calculateCountdown = (eventDate) => {
    const eventTime = new Date(eventDate).getTime();
    const currentTime = new Date().getTime();
    const diff = eventTime - currentTime;

    if (diff <= 0) return "Registration Ended!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
          filteredEvents.slice(0, visibleEventsCount).map((event) => (
            <div key={event.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="event-card">
                {event.type === 'upcoming' && <p className="countdown">{calculateCountdown(event.date)}</p>}
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description.substring(0, 100)}...</p>
                  <p className="event-meta">
                    {event.type === 'live' && <span className="live-indicator"></span>}
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p className="event-meta"><strong>Venue:</strong> {event.venue}</p>
                  <div className="event-buttons">
                    <button className="details-btn" onClick={() => setSelectedEvent(event)}>More Details</button>
                    {new Date(event.deadline).getTime() > new Date().getTime() ? (
                      <button className="register-btn" onClick={() => openRegistrationForm(event)}>Register Now</button>
                    ) : (
                      <button className="leaderboard-btn" onClick={() => setShowLeaderboard(event)}>Leaderboard</button>
                    )}
                  </div>
                </div>
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

      {visibleEventsCount < filteredEvents.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {selectedEvent && (
        <EventDetailsPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}


      {showLeaderboard && (
        <LeaderboardPopup event={showLeaderboard} onClose={() => setShowLeaderboard(null)} />
      )}

      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content">
            <img src={lightboxImage} alt="Event Banner Lightbox" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
