import React, { useEffect, useState } from 'react';
import './style.css';

const Spider = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const moveSpider = () => {
      const stepX = (Math.random() - 0.5) * 40; // Random step -20 to 20
      const stepY = (Math.random() - 0.5) * 40;
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - 80, prev.x + stepX)),
        y: Math.max(0, Math.min(window.innerHeight - 80, prev.y + stepY))
      }));
    };

    const interval = setInterval(moveSpider, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="spider"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <svg width="120" height="120" viewBox="0 0 50 50" className="spider-svg">
        {/* Body */}
        <ellipse cx="25" cy="25" rx="12" ry="10" fill="#000c06" />
        {/* Head */}
        <circle cx="25" cy="18" r="6" fill="#000c06" />
        {/* Eyes */}
        <circle cx="23" cy="16" r="1.5" fill="#00ff7f" />
        <circle cx="27" cy="16" r="1.5" fill="#00ff7f" />
        {/* Fangs */}
        <polygon points="22,19 23,21 24,19" fill="white" />
        <polygon points="26,19 27,21 28,19" fill="white" />
        {/* Legs */}
        <path d="M13 20 Q8 18 3 15" stroke="#00ff7f" strokeWidth="2" fill="none" className="leg leg1" />
        <path d="M13 22 Q8 20 3 20" stroke="#00ff7f" strokeWidth="2" fill="none" className="leg leg2" />
        <path d="M13 24 Q8 22 3 25" stroke="#00ff7f" strokeWidth="2" fill="none" className="leg leg3" />
        <path d="M13 26 Q8 24 3 30" stroke="#00ff7f" strokeWidth="2" fill="none" className="leg leg4" />
        <path d="M37 20 Q42 18 47 15" stroke="#00ff7f" strokeWidth="2" fill="none" className="leg leg5" />
        <path d="M37 22 Q42 20 47 20" stroke="#00ff7f" strokeWidth="2" fill="none" className="leg leg6" />
        <path d="M37 24 Q42 22 47 25" stroke="#00ff7f" strokeWidth="2" fill="none" className="leg leg7" />
        <path d="M37 26 Q42 24 47 30" stroke="#00ff7f" strokeWidth="2" fill="none" className="leg leg8" />
      </svg>
    </div>
  );
};

export default Spider;
