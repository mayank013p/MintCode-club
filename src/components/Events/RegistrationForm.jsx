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
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Registration Successful!");
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-form" onClick={(e) => e.stopPropagation()}>
        <h2>Register for {selectedEvent?.title || "an Event"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
            <label>{selectedEvent.eventType ? "Team Name:" : "Full Name:"}</label>
    <input
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      placeholder={selectedEvent.eventType ? "Enter your team name" : "Enter your full name"}
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
              <select
                name="gitStudent"
                value={formData.gitStudent}
                onChange={handleChange}
                required
              >
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
              <select
                name="mintCodeMember"
                value={formData.mintCodeMember}
                onChange={handleChange}
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>You are a:</label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="working">Working Professional</option>
              </select>
            </div>
            <div className="form-group">
              <label>Stream:</label>
              <select
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                required
              >
                <option value="cse">Computer Science</option>
                <option value="it">Information Technology</option>
                <option value="ece">Electronics & Communication</option>
                <option value="mech">Mechanical Engineering</option>
                <option value="civil">Civil Engineering</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {selectedEvent.eventType && (
            <div className="team-section">
              <label>Team Members:</label>
              {formData.teamMembers.map((member, index) => (
                <div className="form-group" key={index}>
                  <input
                    type="text"
                    placeholder={`Team Member ${index + 1} Name`}
                    value={member}
                    onChange={(e) =>
                      handleTeamMemberChange(index, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={addTeamMember}>
                + Add Team Member
              </button>
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
      </div>
    </div>
  );
};

export default RegistrationForm;
