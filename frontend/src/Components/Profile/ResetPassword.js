import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Customer/Header/Header";
import Footer from "../Customer/Footer/Footer";
import "./ResetPassword.css"; // Add this import

function ResetPassword() {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:6001/Customers/resetPassword",
        passwordData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Password reset successfully!");
        navigate("/CustomerProfile");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div>
      <Header/> 
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default ResetPassword;