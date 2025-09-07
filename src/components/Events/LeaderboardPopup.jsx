import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderbd.css";

const LeaderboardPopup = ({ onClose, event }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    if (event?.id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/leaderboard/${event.id}`)
        .then((res) => {
          setLeaderboardData(res.data.leaderboard || []);
        })
        .catch((err) => {
          console.error("Error fetching leaderboard:", err);
        });
    }
  }, [event]);

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-popup">
        <h2 className="leaderboard-title">{event?.title}</h2>

        {leaderboardData.length >= 3 && (
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
        )}

        <div className="rank-list">
          {leaderboardData.slice(3).map((student, index) => (
            <div className="rank-item" key={student.id}>
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
