import React, { useState } from "react";
import "./style.css"; // Add styling
import membersData from "./membersData";
import linkedin from "../../assets/LI-Logo.png";

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");

 
  const filteredMembers = membersData.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <div className="members-container">
      {/* Hero Section */}
      <div className="members-hero">
        <h1>Meet Our <span className="highlight">Team</span></h1>
        <p>Dedicated professionals working behind the scenes</p>
      </div>

      {/* Search Box */}
      <div className="members-search-box-container">
        <input
          type="text"
          className="members-search-box"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Members Grid */}
      <div className="members-grid">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div key={member.id} className="member-card">
              <h3>{member.name}</h3>
              <p><strong>Role:</strong> {member.role}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-card-linkedin-link">
                <img src={linkedin} alt="LinkedIn" className="linkedin-logo" />
              </a>
            </div>
          ))
        ) : (
          <p className="no-members-message">No matching members found.</p>
        )}
      </div>
    </div>
  );
};

export default Members;
