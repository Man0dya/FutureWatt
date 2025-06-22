import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./OffGrid.css";

function OffGrid() {
  const [packages, setPackages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:6001/Package");
        setPackages(response.data.filter(pkg => pkg.package_type === 'Off Grid Solar Electricity System'));
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    const startTime = Date.now();
    fetchPackages().then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 2000 - elapsedTime;
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
      setErrorMessage("Please login to experience our solar solutions!");
    } else {
      navigate("/PlaceOrder", { state: { package: pkg } });
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
      <div className="offgridpkg-loading-container">
        <h2 className="offgridpkg-loading-text">FutureWatt</h2>
        <div className="offgridpkg-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="offgridpkg-main-container">
        <h2 id="offgridpkg-packages-title">Off Grid Solar Packages</h2>

        <div className="offgridpkg-content-wrapper">
          {/* Packages Section */}
          <div className="offgridpkg-packages-section">
            {errorMessage && <div className="offgridpkg-error-text">{errorMessage}</div>}
            <div className="offgridpkg-packages-list">
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <div className="offgridpkg-package-item" key={pkg._id}>
                    <h3>{pkg.package_name}</h3>
                    {renderDescriptionLines(pkg.description)}
                    <div className="offgridpkg-package-cost">LKR {pkg.price.toLocaleString()}</div>
                    <button
                      className="offgridpkg-order-btn"
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