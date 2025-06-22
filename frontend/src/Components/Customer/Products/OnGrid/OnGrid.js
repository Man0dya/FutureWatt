import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./OnGrid.css";

function OffGrid() {
  const [packages, setPackages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [usage, setUsage] = useState("");
  const [estimatedIncome, setEstimatedIncome] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:6001/Package");
        setPackages(
          response.data.filter(
            (pkg) => pkg.package_type === "On Grid Solar Electricity System"
          )
        );
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    // Ensure loading state lasts for 3 seconds
    const startTime = Date.now();
    fetchPackages().then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 2000 - elapsedTime; // 3000ms = 3 seconds
      if (remainingTime > 0) {
        setTimeout(() => setLoading(false), remainingTime);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleBuyNowClick = (pkg) => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      setErrorMessage("Login to experience our products!");
    } else {
      navigate("/PlaceOrder", { state: { package: pkg } });
    }
  };

  const calculateIncome = () => {
    const capacityKW = parseFloat(capacity);
    const monthlyUsage = parseFloat(usage);
    if (!isNaN(capacityKW) && !isNaN(monthlyUsage)) {
      const generatedUnits = capacityKW * 110;
      const extraUnits = Math.max(generatedUnits - monthlyUsage, 0);
      const income = extraUnits * 27;
      setEstimatedIncome(income);
    } else {
      setEstimatedIncome(null);
    }
  };

  // Function to split description into lines
  const renderDescriptionLines = (description) => {
    // Split by newline (\n) or assume it's a single line if no delimiter exists
    const lines = description.split("\n").filter((line) => line.trim() !== "");
    return lines.map((line, index) => (
      <p key={index} className="description-line">
        {line}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="ongrid-loading-container">
        <h2 className="ongrid-loading-text">FutureWatt</h2>
        <div className="ongrid-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="ongrid-main-container">
        <h2 id="ongrid-packages-title">On Grid Solar Packages</h2>

        <div className="ongrid-content-wrapper">
          {/* Solar Income Calculator - Left Side */}
          <div className="calc-container">
            <h3 className="calc-title">Solar Income Calculator</h3>
            <label className="calc-label">Enter Solar Package Capacity (kW):</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="e.g. 6"
              className="calc-input"
            />
            <label className="calc-label">Enter Monthly Electricity Usage (Units):</label>
            <input
              type="number"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              placeholder="e.g. 60"
              className="calc-input"
            />
            <button onClick={calculateIncome} className="calc-button">Calculate Income</button>
            {estimatedIncome !== null && (
              <div className="calc-output">
                <h4>
                  Estimated Monthly Income: LKR {estimatedIncome.toLocaleString()}
                </h4>
              </div>
            )}
          </div>

          {/* Packages Section - Right Side */}
          <div className="ongrid-packages-section">
            {errorMessage && <div className="ongrid-error-text">{errorMessage}</div>}
            <div className="ongrid-packages-list">
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <div className="ongrid-package-item" key={pkg._id}>
                    <h3>{pkg.package_name}</h3>
                    {renderDescriptionLines(pkg.description)}
                    <div className="ongrid-package-cost">LKR {pkg.price}</div>
                    <button
                      className="ongrid-order-btn"
                      onClick={() => handleBuyNowClick(pkg)}
                    >
                      Place Order
                    </button>
                  </div>
                ))
              ) : (
                <p>No packages available at the moment</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OffGrid;