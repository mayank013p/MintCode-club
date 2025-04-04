import React, { useState } from "react";
import "./style.css"; // Ensure this contains the updated styles

const JoinMintcodeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    year: "",
    contact: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose(); // Close the form after submission
  };

  return (
    <div className="popup-overlay">
    <div className="popup-form">
      <h2>Join Mintcode</h2>
      <form onSubmit={handleSubmit}>
        {/* Two-column layout */}
        <div className="form-row">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>College:</label>
            <input type="text" name="college" value={formData.college} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Branch:</label>
            <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Year:</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Contact:</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Why do you want to join?</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} required></textarea>
        </div>

        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default JoinMintcodeForm;
