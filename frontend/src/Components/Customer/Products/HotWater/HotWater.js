import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./HotWater.css";

function HotWater() {
  const [packages, setPackages] = useState([]);
  const [bathrooms, setBathrooms] = useState("");
  const [pantries, setPantries] = useState("");
  const [people, setPeople] = useState("");
  const [suggestedCapacity, setSuggestedCapacity] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:6001/Package");
        setPackages(response.data.filter(pkg => pkg.package_type === 'Hot Water System'));
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

  const calculateCapacity = () => {
    const b = parseInt(bathrooms);
    const p = parseInt(pantries);
    const ppl = parseInt(people);

    if (!isNaN(b) && !isNaN(p) && !isNaN(ppl)) {
      let capacity = 100;
      if (b === 1 && p === 1 && ppl >= 2 && ppl <= 3) {
        capacity = 100;
      } else if (b === 2 && p === 1 && ppl >= 3 && ppl <= 4) {
        capacity = 150;
      } else if (b === 3 && p === 1 && ppl >= 5 && ppl <= 6) {
        capacity = 200;
      } else if (b >= 4 && p === 1 && ppl >= 7 && ppl <= 8) {
        capacity = 300;
      }

      setSuggestedCapacity(capacity);
      setMessage("This is an estimated capacity based on standard usage. Your actual requirement may vary based on household habits and additional factors.");
    } else {
      setSuggestedCapacity(null);
      setMessage("Please enter valid numbers for all fields.");
    }
  };

  // Function to split description into lines
  const renderDescriptionLines = (description) => {
    const lines = description.split("\n").filter((line) => line.trim() !== "");
    return lines.map((line, index) => (
      <p key={index} className="description-line">
        {line}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="hotwater-loading-container">
        <h2 className="hotwater-loading-text">FutureWatt</h2>
        <div className="hotwater-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="hotwater-main-container">
        <h2 id="hotwater-packages-title">Hot Water System Packages</h2>

        <div className="hotwater-content-wrapper">
          {/* Capacity Calculator - Left Side */}
          <div className="calc-container">
            <h3 className="calc-title">Hot Water Capacity Calculator</h3>
            <label className="calc-label">Number of Bathrooms:</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="e.g. 2"
              className="calc-input"
            />
            <label className="calc-label">Number of Pantries:</label>
            <input
              type="number"
              value={pantries}
              onChange={(e) => setPantries(e.target.value)}
              placeholder="e.g. 1"
              className="calc-input"
            />
            <label className="calc-label">Number of People in Household:</label>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="e.g. 4"
              className="calc-input"
            />
            <button onClick={calculateCapacity} className="calc-button">Calculate</button>
            {suggestedCapacity !== null && (
              <div className="calc-output">
                <h4>Suggested Capacity: {suggestedCapacity}L</h4>
                <p className="calc-message">{message}</p>
              </div>
            )}
          </div>

          {/* Packages Section - Right Side */}
          <div className="hotwater-packages-section">
            {errorMessage && <div className="hotwater-error-text">{errorMessage}</div>}
            <div className="hotwater-packages-list">
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <div className="hotwater-package-item" key={pkg._id}>
                    <h3>{pkg.package_name}</h3>
                    {renderDescriptionLines(pkg.description)}
                    <div className="hotwater-package-cost">LKR {pkg.price}</div>
                    <button
                      className="hotwater-order-btn"
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

export default HotWater;