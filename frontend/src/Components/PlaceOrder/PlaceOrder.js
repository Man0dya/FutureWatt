import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Customer/Header/Header";
import Footer from "../Customer/Footer/Footer";
import "./PlaceOrder.css";

function PlaceOrder() {
  const { state } = useLocation(); // Get the package data passed from the previous page
  const { package: selectedPackage } = state || {}; // Destructure the package data
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [NIC, setNIC] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      setErrorMessage("Please log in to place the order.");
      return;
    }

    if (!fullName || !email || !contactNo || !address || !NIC || !deliveryLocation) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6001/order/createOrder", {
        customerId,
        packageId: selectedPackage._id,
        fullName,
        email,
        contactNo,
        address,
        NIC,
        deliveryLocation,
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        navigate("/CustomerProfile"); // Redirect to the profile page after successful order placement
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      setErrorMessage("Failed to place the order. Please try again later.");
    }
  };

  return (
    <div>
      <Header />
      <div className="place-order-container">
        <div className="order-details">
          <h2>Package Details</h2>
          <p><strong>Package Name:</strong> {selectedPackage.package_name}</p>
          <p><strong>Description:</strong></p>
          {selectedPackage.description ? (
            <ul>
              {selectedPackage.description
                .split('\n')
                .filter(line => line.trim() !== '')
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ul>
          ) : (
            <p>No description available.</p>
          )}
          <p><strong>Price:</strong> LKR {selectedPackage.price}</p>
        </div>

        <form onSubmit={handleSubmitOrder} className="order-form">
          <h3>Enter Your Details</h3>

          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <label>Contact No:</label>
          <input
            type="text"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            placeholder="Contact No"
          />

          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />

          <label>NIC:</label>
          <input
            type="text"
            value={NIC}
            onChange={(e) => setNIC(e.target.value)}
            placeholder="NIC"
          />

          <label>Delivery Location:</label>
          <input
            type="text"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder="Delivery Location"
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="place-order-btn">Place Order</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default PlaceOrder;