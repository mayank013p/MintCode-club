import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './style.css';
import EventDetailsPopup from '../Events/EventDetailsPopup';
import RegistrationList from './RegistrationList';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [showRegistrationsForEvent, setShowRegistrationsForEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('adminToken');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/admin/events`, authHeader);
      const eventsData = Array.isArray(response.data) ? response.data : response.data.events || [];
      const formattedEvents = eventsData.map(event => ({
        ...event,
        status: new Date(event.eventdate) < new Date() ? 'past' : 'upcoming',
      }));
      setEvents(formattedEvents);
    } catch (err) {
      setError('Failed to fetch events.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events
      .filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(event =>
        filterType === 'all' ? true : event.status === filterType
      );
  }, [events, searchTerm, filterType]);

  const handleCreate = async (eventData) => {
    try {
      await axios.post(`${apiUrl}/api/admin/events`, eventData, authHeader);
      fetchEvents();
      setIsCreating(false);
    } catch (err) {
      setError('Failed to create event.');
    }
  };

  const handleUpdate = async (id, eventData) => {
    try {
      await axios.put(`${apiUrl}/api/admin/events/${id}`, eventData, authHeader);
      fetchEvents();
      setEditingEvent(null);
    } catch (err) {
      setError('Failed to update event.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${apiUrl}/api/admin/events/${id}`, authHeader);
        fetchEvents();
      } catch (err) {
        setError('Failed to delete event.');
      }
    }
  };
  
  const handleEditFromPopup = (event) => {
    setViewingEvent(null);
    setEditingEvent(event);
  };

  if (loading) return <div className="loading-container"><p>Loading events...</p></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="event-management-page">
      <h1>Event Management</h1>
      
      <div className="controls-container">
        <div className="search-filter-box">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
        <button onClick={() => setIsCreating(true)} className="create-event-btn">Create Event</button>
      </div>

      {(isCreating || editingEvent) && (
        <EventForm
          event={editingEvent}
          onSave={editingEvent ? (data) => handleUpdate(editingEvent.id, data) : handleCreate}
          onCancel={() => { setIsCreating(false); setEditingEvent(null); }}
        />
      )}

      {viewingEvent && (
        <EventDetailsPopup 
          event={viewingEvent} 
          onClose={() => setViewingEvent(null)}
          onEdit={() => handleEditFromPopup(viewingEvent)}
        />
      )}

      <div className="events-list">
        {filteredEvents.length > 0 ? filteredEvents.map(event => (
          <div key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p className={`event-type-badge ${event.status}`}>{event.status}</p>
            <p className="event-description">{event.description}</p>
            <div className="event-actions">
              <button onClick={() => setViewingEvent(event)} className="details-btn">Details</button>
              <button onClick={() => setShowRegistrationsForEvent(event.id)} className="registration-btn">View Registrations</button>
              <button onClick={() => setEditingEvent(event)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(event.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        )) : <p>No events found matching your criteria.</p>}
      </div>

      {showRegistrationsForEvent && (
        <div className="registration-list-popup">
          <div className="registration-list-content">
            <div className="registration-list-header">
              <h3>Registrations</h3>
              <button className="close-registration-list" onClick={() => setShowRegistrationsForEvent(null)}>Close</button>
            </div>
            <div className="registration-list-body">
              <RegistrationList eventId={showRegistrationsForEvent} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EventForm = ({ event = null, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      title: event?.title || '',
      description: event?.description || '',
      rules: event?.rules?.join(', ') || '',
      whyparticipate: event?.whyparticipate?.join(', ') || '',
      benefits: event?.benefits?.join(', ') || '',
      note: event?.note?.join(', ') || '',
      bannerimage: event?.bannerimage || '',
      venue: event?.venue || '',
      eventtype: event?.eventtype || '',
      memberlimit: event?.memberlimit || '',
      eventdate: event?.eventdate ? new Date(event.eventdate).toISOString().slice(0, 16) : '',
      registrationdeadline: event?.registrationdeadline ? new Date(event.registrationdeadline).toISOString().slice(0, 16) : '',
      type: event?.type || '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, bannerimage: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const dataToSubmit = {
        ...formData,
        rules: formData.rules.split(',').map(item => item.trim()).filter(Boolean),
        whyparticipate: formData.whyparticipate.split(',').map(item => item.trim()).filter(Boolean),
        benefits: formData.benefits.split(',').map(item => item.trim()).filter(Boolean),
        note: formData.note.split(',').map(item => item.trim()).filter(Boolean),
      };
      onSave(dataToSubmit);
    };
  
    return (
      <div className="event-form-modal">
        <form onSubmit={handleSubmit} className="event-form">
          <h2>{event ? 'Edit Event' : 'Create Event'}</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            </div>
            <div className="form-group">
              <label>Event Type</label>
              <input name="eventtype" value={formData.eventtype} onChange={handleChange} placeholder="Event Type" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Member Limit</label>
              <input type="number" name="memberlimit" value={formData.memberlimit} onChange={handleChange} placeholder="Member Limit" />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" />
            </div>
          </div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <label>Rules (comma-separated)</label>
          <textarea name="rules" value={formData.rules} onChange={handleChange} placeholder="Rules (comma-separated)" />
          <label>Why Participate (comma-separated)</label>
          <textarea name="whyparticipate" value={formData.whyparticipate} onChange={handleChange} placeholder="Why Participate (comma-separated)" />
          <label>Benefits (comma-separated)</label>
          <textarea name="benefits" value={formData.benefits} onChange={handleChange} placeholder="Benefits (comma-separated)" />
          <label>Notes (comma-separated)</label>
          <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Notes (comma-separated)" />
          <div className="form-row">
            <div className="form-group">
              <label>Venue</label>
              <input name="venue" value={formData.venue} onChange={handleChange} placeholder="Venue" />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="datetime-local" name="eventdate" value={formData.eventdate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Registration Deadline</label>
              <input type="datetime-local" name="registrationdeadline" value={formData.registrationdeadline} onChange={handleChange} />
            </div>
          </div>
          <label>Banner Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.bannerimage && (
            <div className="image-preview-container">
              <img src={formData.bannerimage} alt="Banner Preview" />
            </div>
          )}
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  };

export default EventManagement;
