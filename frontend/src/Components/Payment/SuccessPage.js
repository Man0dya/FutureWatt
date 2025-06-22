import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SuccessPage.css";

const SuccessPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get("session_id");

  const [paymentData, setPaymentData] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!transactionId) return;

      try {
        const response = await axios.get(`http://localhost:6001/Payment/getPayment/${transactionId}`);
        console.log("Payment Data Response:", response.data);
        setPaymentData(response.data);
        setIsAnimated(true); // Trigger animation after data loads
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [transactionId]);

  return (
    <div className="success-container">
      <div className="success-box">
        <div className={`success-icon ${isAnimated ? "animate" : ""}`}>
          <svg viewBox="0 0 52 52" className="checkmark">
            <circle cx="26" cy="26" r="25" fill="none" />
            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h2>Payment Successful</h2>
        
        {paymentData ? (
          <div className="payment-details">
            <p>
              <strong>Transaction ID:</strong>
              <span className="transaction-id">{paymentData.transactionId}</span>
            </p>
            <p><strong>Order ID:</strong> {paymentData.orderId}</p>
            <p><strong>Amount:</strong> LKR {paymentData.amount}</p>
            <p><strong>Date & Time:</strong> {new Date().toLocaleString()}</p>
          </div>
        ) : (
          <p className="loading-text">Loading payment details...</p>
        )}

        <a href="/CustomerProfile" className="profile-link">Go to Profile</a>
      </div>
    </div>
  );
};

export default SuccessPage;