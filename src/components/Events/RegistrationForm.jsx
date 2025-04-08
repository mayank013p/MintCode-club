import React, { useState } from "react";
import "./Regform.css";

const RegistrationForm = ({ selectedEvent, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gitStudent: "no",
    rollNumber: "",
    collegeName: "",
    year: "",
    mintCodeMember: "no",
    gender: "male",
    occupation: "student",
    stream: "cse",
    remarks: "",
    teamMembers: [""],
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamMemberChange = (index, value) => {
    const updatedTeam = [...formData.teamMembers];
    updatedTeam[index] = value;
    setFormData({ ...formData, teamMembers: updatedTeam });
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length >= (selectedEvent?.memberLimit || Infinity)) {
      alert(`You can only add up to ${selectedEvent.memberLimit} team members.`);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, ""],
    }));
  };

  const removeTeamMember = (indexToRemove) => {
    const updatedTeam = formData.teamMembers.filter((_, index) => index !== indexToRemove);
    setFormData({ ...formData, teamMembers: updatedTeam });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      eventid: selectedEvent?.id || selectedEvent?.eventId,
      fullname: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      gitstudent: formData.gitStudent === "yes",
      rollnumber: formData.rollNumber,
      collegename: formData.collegeName,
      year: formData.year,
      mintcodemember: formData.mintCodeMember === "yes",
      gender: formData.gender,
      occupation: formData.occupation,
      stream: formData.stream,
      remarks: formData.remarks,
      teammembers: formData.teamMembers.filter((member) => member.trim() !== ""),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2500);
      } else {
        const data = await response.json();
        alert(`Registration Failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-form" onClick={(e) => e.stopPropagation()}>
        {showSuccess ? (
          <div className="success-animation">
            <div className="checkmark-circle">
              <div className="background"></div>
              <div className="checkmark">&#10003;</div>
            </div>
            <p>Registration Successful!</p>
          </div>
        ) : (
          <>
            <h2>Register for {selectedEvent?.title || "an Event"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>{selectedEvent.eventType === "team" ? "Team Name:" : "Full Name:"}</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={selectedEvent.eventType === "team" ? "Enter your team name" : "Enter your full name"}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Are you a Git student?</label>
                  <select name="gitStudent" value={formData.gitStudent} onChange={handleChange} required>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              {formData.gitStudent === "yes" ? (
                <div className="form-group">
                  <label>Roll Number:</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="Enter your roll number"
                    required
                  />
                </div>
              ) : (
                <div className="form-row">
                  <div className="form-group">
                    <label>College Name:</label>
                    <input
                      type="text"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      placeholder="Enter your college name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Year:</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="Enter your year"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Are you a MintCode member?</label>
                  <select name="mintCodeMember" value={formData.mintCodeMember} onChange={handleChange} required>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>You are a:</label>
                  <select name="occupation" value={formData.occupation} onChange={handleChange} required>
                    <option value="student">Student</option>
                    <option value="working">Working Professional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Stream:</label>
                  <select name="stream" value={formData.stream} onChange={handleChange} required>
                    <option value="cse">Computer Science</option>
                    <option value="it">Information Technology</option>
                    <option value="ece">Electronics & Communication</option>
                    <option value="mech">Mechanical Engineering</option>
                    <option value="civil">Civil Engineering</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {selectedEvent.eventType === "team" && (
                <div className="team-section">
                  <label className="team-form-group">Team Members:</label>
                  {formData.teamMembers.map((member, index) => (
                    <div className="team-member-row" key={index}>
                      <input
                        type="text"
                        placeholder={`Team Member ${index + 1} Name`}
                        value={member}
                        onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                        required
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="remove-member-btn"
                          onClick={() => removeTeamMember(index)}
                          title="Remove Member"
                        >
                          &#10751;
                        </button>
                      )}
                    </div>
                  ))}

                  {formData.teamMembers.length < selectedEvent.memberLimit && (
                    <button className="add-member-button" type="button" onClick={addTeamMember}>
                      &#10750;
                    </button>
                  )}
                  {formData.teamMembers.length >= selectedEvent.memberLimit && (
                    <p className="limit-message">Team limit reached ({selectedEvent.memberLimit} members)</p>
                  )}
                </div>
              )}

              <div className="form-group">
                <label>Remarks (Optional):</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter any remarks"
                  rows="3"
                />
              </div>

              <div className="button-group">
                <button type="submit">Register</button>
              </div>
            </form>
            <button className="form-close-button" onClick={onClose}>
              ✖
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
