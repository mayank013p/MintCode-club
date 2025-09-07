import React, { useState, useEffect } from "react";
import "./style.css";

const Members = () => {
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/api/members`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMembersData(data.members || []);
      } catch (e) {
        setError("Failed to fetch members. Please try again later.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Get unique years, sort them descending, and add "All"
  const uniqueYears = [...new Set(membersData.map(member => member.year))];
  uniqueYears.sort((a, b) => b - a);
  const years = ["All", ...uniqueYears];

  const filteredMembers = membersData.filter(member => {
    const searchMatch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.role && member.role.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const yearMatch = selectedYear === "All" || member.year.toString() === selectedYear.toString();
    
    return searchMatch && yearMatch;
  });

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    (acc[member.year] = acc[member.year] || []).push(member);
    return acc;
  }, {});

  // Get the years from the filtered results and sort them descending for display
  const sortedYears = Object.keys(groupedMembers).sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="members-container">
        <p className="loading-message" style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="members-container">
        <p className="error-message" style={{ textAlign: 'center', fontSize: '1.2rem', color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="members-container">
      <div className="members-hero">
        <h1>Meet Our <span className="highlight">Team</span></h1>
        <p>The brilliant minds driving our community forward.</p>
      </div>

      <div className="filters-container">
        <input
          type="text"
          className="members-search-box"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {years.length > 1 && (
          <div className="year-filter">
            {years.map(year => (
              <button
                key={year}
                className={`year-button ${selectedYear.toString() === year.toString() ? "active" : ""}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>

      {sortedYears.length > 0 ? (
        sortedYears.map(year => (
          <div key={year} className="year-group">
            <h2 className="year-title">{year}</h2>
            <div className="members-grid">
              {groupedMembers[year].map(member => (
                <div key={member.id} className="member-card">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  {member.linkedinUrl && (
                    <div className="member-linkedin">
                      <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-members-message">No members found.</p>
      )}
    </div>
  );
};

export default Members;
