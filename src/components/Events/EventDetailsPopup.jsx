import React, { useState } from 'react';
import './style.css';

const EventDetailsPopup = ({ event, onClose, onEdit }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!event) return null;

  return (
    <>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <h2>{event.title}</h2>
          </div>
          <div className="popup-body">
            <div className="popup-banner-container">
              <img 
                src={event.banner || event.bannerimage} 
                alt={event.title} 
                className="popup-banner" 
                onClick={() => setLightboxImage(event.banner || event.bannerimage)}
              />
              <div className="popup-key-details">
                <h4>Details</h4>
                <ul>
                  <li><strong>Date:</strong> {new Date(event.date).toDateString()}</li>
                  <li><strong>Registration Deadline:</strong> {new Date(event.deadline).toDateString()}</li>
                  <li><strong>Venue:</strong> {event.venue}</li>
                </ul>
              </div>
            </div>
            <div className="popup-details-content">
              <h4>Description</h4>
              <p>{event.description}</p>
              
              {event.rules && event.rules.length > 0 && (
                <>
                  <h4>Rules</h4>
                  <ul>{event.rules.map((rule, i) => <li key={i}>{rule}</li>)}</ul>
                </>
              )}

              {event.whyparticipate && event.whyparticipate.length > 0 && (
                <>
                  <h4>Why Participate</h4>
                  <ul>{event.whyparticipate.map((why, i) => <li key={i}>{why}</li>)}</ul>
                </>
              )}

              {event.benefits && event.benefits.length > 0 && (
                <>
                  <h4>Benefits</h4>
                  <ul>{event.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}</ul>
                </>
              )}
              
              {event.note && event.note.length > 0 && (
                <>
                  <h4>Note</h4>
                  <ul>{event.note.map((note, i) => <li key={i}>{note}</li>)}</ul>
                </>
              )}
            </div>
          </div>
          <div className="popup-footer">
            <button className="event-close-btn" onClick={onClose}>Close</button>
            {onEdit && (
              <button className="edit-btn-popup" onClick={onEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>

      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content">
            <img src={lightboxImage} alt="Event Banner Lightbox" />
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetailsPopup;
