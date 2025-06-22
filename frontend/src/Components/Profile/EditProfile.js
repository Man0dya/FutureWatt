import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Customer/Header/Header";
import Footer from "../Customer/Footer/Footer";
import "./EditProfile.css"; // Add this line
function EditProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    nic: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    console.log("Customer ID from localStorage:", customerId);

    if (!customerId) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:6001/Customers/${customerId}`, {
        withCredentials: true, // Ensure credentials are included
      })
      .then((response) => {
        console.log("User data fetched:", response.data);
        if (response.data) {
          setUserData({
            name: response.data.name || "",
            email: response.data.email || "",
            contact: response.data.contact || "",
            address: response.data.address || "",
            nic: response.data.nic || "",
          });
          setLoading(false); // Set loading to false after data is fetched
        } else {
          console.error("No user data found in response");
          alert("Error fetching user data");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data");
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:6001/Customers/${customerId}`,
        userData,
        {
          withCredentials: true,
        }
      );

      alert("Profile updated successfully!");
      navigate("/CustomerProfile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  // Show loading state until data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header/>
    <div className="edit-profile-container">
      <div className="edit-profile-box">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={userData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nic">NIC:</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={userData.nic}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default EditProfile;
