import React from "react";
import "./Welcome.css"; // Import the CSS file

const Welcome = () => {
  return (
    <div className="welcome-container">
      <svg className="welcome-svg" viewBox="0 0 800 200">
        <text className="welcome-text" x="50%" y="50%" dy=".35em" textAnchor="middle">
          Welcome To FutureWatt
        </text>
      </svg>
    </div>
  );
};

export default Welcome;
