import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Customer/Header/Header";
import Footer from "../Customer/Footer/Footer";
import "./RepairRequestPage.css";

function RequestRepair() {
  const { state } = useLocation();
  const [repairType, setRepairType] = useState("");
  const [description, setDescription] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmitRepairRequest = async () => {
    try {
      const response = await axios.post("http://localhost:6001/Repair/createRepair", {
        orderId: state.orderId,
        customerName: state.customerName,
        customerEmail: state.customerEmail,
        customerContact: state.customerContact,
        packageName: state.packageName,
        address: state.address,
        repairType,
        description,
      }, {
        withCredentials: true,
      });

      if (response.status === 201) {
        setConfirmation(true);
      } else {
        setError("There was an issue submitting your repair request. Please try again.");
      }
    } catch (error) {
      setError("Error submitting repair request. Please try again.");
      console.error("Error submitting repair request:", error);
    }
  };

  const handleBack = () => {
    navigate("/CustomerProfile");
  };

  return (
    <div><Header />
    <div className="repair-request-container">
      
      <div className="repair-request-box">
        <h1>Repair Request</h1>
        <form>
          <div className="form-group">
            <label>Order ID:</label>
            <input type="text" value={state.orderId} readOnly />
          </div>
          <div className="form-group">
            <label>Customer Name:</label>
            <input type="text" value={state.customerName} readOnly />
          </div>
          <div className="form-group">
            <label>Customer Email:</label>
            <input type="text" value={state.customerEmail} readOnly />
          </div>
          <div className="form-group">
            <label>Customer Contact:</label>
            <input type="text" value={state.customerContact} readOnly />
          </div>
          <div className="form-group">
            <label>Package Name:</label>
            <input type="text" value={state.packageName} readOnly />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={state.address} readOnly />
          </div>
          <div className="form-group">
            <label>Repair Type:</label>
            <select
              value={repairType}
              onChange={(e) => setRepairType(e.target.value)}
              required
            >
              <option value="">Select Repair Type</option>
              <option value="Panel Damage">Panel Damage</option>
              <option value="Battery Replacement">Battery Replacement</option>
              <option value="Inverter Issue">Inverter Issue</option>
              <option value="Wiring Problem">Wiring Problem</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description of the Issue:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleSubmitRepairRequest}>
            Submit Repair Request
          </button>
        </form>

        {confirmation && (
          <div className="confirmation-message">
            <p>Your repair request has been submitted successfully!</p>
            <button onClick={handleBack}>Go Back to Profile</button>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
     
    </div> <Footer />
    </div>
  );
}

export default RequestRepair;
