import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const customerName = localStorage.getItem("customerName");
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome, {customerName}!</h1>
      <button onClick={() => navigate("/CustomerProfile")}>Profile</button>
    </div>
  );
}

export default CustomerHome;
