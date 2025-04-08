import React, { useState } from "react";
import "./style.css"; // Add styles below if not already

const JoinMintcodeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    year: "",
    contact: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // show success animation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          college: "",
          branch: "",
          year: "",
          contact: "",
          reason: "",
        });

        // Optional: auto-close after 2 seconds
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("❌ Network error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        {isSuccess ? (
          <div className="success-message">
            <div className="checkmark-animation">✔</div>
            <p>Thank you! Your form was sent successfully.</p>
          </div>
        ) : (
          <>
            <h2>Join Mintcode</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" placeholder="Enter your full name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>College:</label>
                  <input type="text" placeholder="Enter your College name" name="college" value={formData.college} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Branch:</label>
                  <input type="text" name="branch" placeholder="Enter your branch" value={formData.branch} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Year:</label>
                  <input type="text" name="year" placeholder="Enter your year" value={formData.year} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact:</label>
                  <input type="text" placeholder="Enter your contact number" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Why do you want to join?</label>
                <textarea name="reason" placeholder="Enter remark" value={formData.reason} onChange={handleChange} required></textarea>
              </div>

              <div className="button-group">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
            <button className="close-button" onClick={onClose}>✖</button>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinMintcodeForm;
