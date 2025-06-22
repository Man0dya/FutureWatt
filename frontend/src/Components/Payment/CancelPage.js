import React from "react";
import "./cancel.css";

const CancelPage = () => {
  return (
    <div className="cancel-container">
      <div className="cancel-box">
        <div className="cancel-icon animate">
          <svg className="cancel-x" viewBox="0 0 100 100">
            <path d="M20 20 L80 80" />
            <path d="M80 20 L20 80" />
          </svg>
        </div>
        <h2>Payment Cancelled</h2>
        <p>Your payment was not completed. Please try again.</p>
        <a href="/CustomerProfile" className="back-link">Go Back</a>
      </div>
    </div>
  );
};

export default CancelPage;