import React from "react";
import "./Leaderbd.css";

const leaderboardData = [
  { name: "Raj Gehlot" },
  { name: "Lokesh P." },
  { name: "Yashpal Bhati" },
  { name: "Prince Raj" },
  { name: "Sumit Chahar" },
  { name: "Shreepal Singh" },
  { name: "Vishnu Singh" },
  { name: "Yash Goyal" },
  { name: "Harshit Sharma" },
  { name: "Meet Sharma" },
  // Add more students here
];

const LeaderboardPopup = ({ onClose, event }) => {
  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-popup">
        <h2 className="leaderboard-title">🏆 Leaderboard - {event?.title}</h2>

        <div className="ladder-container">
          <div className="ladder-card second">
            <div>🥈</div>
            <div>{leaderboardData[1]?.name}</div>
          </div>
          <div className="ladder-card first">
            <div>🥇</div>
            <div>{leaderboardData[0]?.name}</div>
          </div>
          <div className="ladder-card third">
            <div>🥉</div>
            <div>{leaderboardData[2]?.name}</div>
          </div>
        </div>

        <div className="rank-list">
          {leaderboardData.slice(3).map((student, index) => (
            <div className="rank-item" key={index}>
              {index + 4}. {student.name}
            </div>
          ))}
        </div>

        <button className="close-button" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default LeaderboardPopup;
