import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../Utils/api"; // Axios instance
import { loadStripe } from "@stripe/stripe-js";
import Header from "../Customer/Header/Header";
import Footer from "../Customer/Footer/Footer";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const { orderId, amount, customerId } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");

  const getUserEmail = () => {
    return localStorage.getItem("userEmail") || "";
  };

  const sendOtp = async () => {
    const userEmail = getUserEmail();
    if (!userEmail) {
      alert("User email not found.");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:6001/otp/send-otp", {
        email: userEmail,
      });
  
      if (res.data.message === "OTP sent successfully!") {
        alert("OTP sent to your email.");
        setOtpSent(true);
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP.");
    }
  };
  

  const verifyOtpAndPay = async () => {
    const userEmail = getUserEmail();
    if (!enteredOtp) {
      alert("Please enter the OTP.");
      return;
    }
  
    console.log("Entered OTP:", enteredOtp); // Log entered OTP for debugging
  
    try {
      const res = await axios.post("http://localhost:6001/otp/verify-otp", {
        email: userEmail,
        otp: enteredOtp, // Ensure enteredOtp is sent as a string or number based on backend expectation
      });
  
      if (res.data.message === "OTP verified successfully!") {
        handleStripePayment(); // Proceed only if OTP is correct
      } else {
        alert("Incorrect OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("OTP verification failed.");
    }
  };
  
  

  const handleStripePayment = async () => {
    setLoading(true);
    const userEmail = getUserEmail();

    if (!userEmail) {
      alert("User is not logged in. Please log in to continue.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:6001/Payment/create-session", {
        customerId,
        orderId,
        amount,
        email: userEmail,
      });

      if (response.data.sessionId) {
        const stripe = await loadStripe("pk_test_51R6eAKPCwwIePmWV8gbW3iFY9j3JDg4bpXXxlEZpvFunYImjIv9aounmG4c7B1G91kiyM7oLj3IjiOPHpkbRazLf00WcgwMSaJ");
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (error) {
          console.error("Error during checkout:", error);
          alert("Error during checkout. Please try again.");
        }
      } else {
        alert("Failed to create Stripe session.");
      }
    } catch (error) {
      console.error("Stripe Payment Error:", error);
      alert("Error processing payment.");
    }

    setLoading(false);
  };

  if (!orderId) {
    alert("Order not found.");
    return <div className="no-order">No order data available.</div>;
  }

  return (
    <div>
      <div className="payment-page">
        <Header />
        <div className="payment-container">
          <h2>Complete Your Payment</h2>
          <p>
            Order ID: <span className="order-id">#{orderId}</span>
          </p>
          <p>
            Total Amount: <span className="amount">LKR {amount}</span>
          </p>

          {!otpSent ? (
            <button onClick={sendOtp} className="pay-button" disabled={loading}>
              Send OTP to Email
            </button>
          ) : (
            <div className="otp-section">
              <input
                type="text"
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                className="otp-input"
              />
              <button
                onClick={verifyOtpAndPay}
                className="pay-button"
                disabled={loading}
              >
                {loading ? "Processing..." : "Verify OTP & Pay with Stripe"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
