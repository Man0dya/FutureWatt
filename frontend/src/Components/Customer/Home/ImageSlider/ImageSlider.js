import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ImageSlider.css";
import image1 from "./images/solar1.jpg";
import image2 from "./images/img1.jpg";
import image3 from "./images/img2.jpg";
import image4 from "./images/img3.jpg";
import image5 from "./images/img4.jpg";
import image6 from "./images/img5.jpg";
import image7 from "./images/img1.jpg";
import image8 from "./images/img2.jpg";
import image9 from "./images/img3.jpg";
import image10 from "./images/img4.jpg";
import image11 from "./images/img5.jpg";
import image12 from "./images/solar1.jpg";

const images1 = [image1, image2, image3, image4, image5, image6];
const images2 = [image7, image8, image9, image10, image11, image12];

const ImageSlider = () => {
  const [paused1, setPaused1] = useState(false);
  const [paused2, setPaused2] = useState(false);

  const details = [
    {
      title: "On Grid Solar 5kW",
      description: [
        "Connected to main power grid",
        "5kW capacity for medium households",
        "Net metering for bill reduction",
        "Ideal for urban homes",
      ],
      link: "/Packages/OnGrid",
    },
    {
      title: "On Grid Solar 10kW",
      description: [
        "High-capacity grid-connected system",
        "10kW for large homes or small businesses",
        "Maximizes energy savings",
        "Supports net metering",
      ],
      link: "/Packages/OnGrid",
    },
    {
      title: "Off Grid Solar 3kW",
      description: [
        "Independent power for remote areas",
        "3kW capacity with battery storage",
        "Ideal for small cabins or farms",
        "Reduces diesel generator use",
      ],
      link: "/Packages/OffGrid",
    },
    {
      title: "Off Grid Solar 5kW",
      description: [
        "Robust off-grid solution",
        "5kW with large battery bank",
        "Perfect for rural homes",
        "24/7 power availability",
      ],
      link: "/Packages/OffGrid",
    },
    {
      title: "Solar Hot Water 100L",
      description: [
        "100L capacity for small families",
        "Solar thermal panels for efficiency",
        "Reduces electricity costs",
        "Eco-friendly water heating",
      ],
      link: "/Packages/HotWater",
    },
    {
      title: "Solar Hot Water 200L",
      description: [
        "200L for medium households",
        "High-efficiency solar collectors",
        "Cost-effective water heating",
        "Suitable for homes and hotels",
      ],
      link: "/Packages/HotWater",
    },
    {
      title: "On Grid Solar 15kW",
      description: [
        "Powerful grid-tied system",
        "15kW for commercial use",
        "Significant bill savings",
        "Supports large energy demands",
      ],
      link: "/Packages/OnGrid",
    },
    {
      title: "Off Grid Solar 8kW",
      description: [
        "High-capacity off-grid system",
        "8kW with extensive battery storage",
        "Ideal for large rural properties",
        "Reliable power independence",
      ],
      link: "/Packages/OffGrid",
    },
    {
      title: "Solar Hot Water 300L",
      description: [
        "300L for large families or businesses",
        "Advanced solar thermal technology",
        "Reduces energy consumption",
        "Perfect for industrial use",
      ],
      link: "/Packages/HotWater",
    },
    {
      title: "On Grid Solar 20kW",
      description: [
        "Industrial-grade grid-connected system",
        "20kW for large businesses",
        "Maximizes energy credits",
        "High-efficiency panels",
      ],
      link: "/Packages/OnGrid",
    },
    {
      title: "Off Grid Solar 10kW",
      description: [
        "Premium off-grid power solution",
        "10kW with robust battery system",
        "Supports large remote facilities",
        "Ensures uninterrupted power",
      ],
      link: "/Packages/OffGrid",
    },
    {
      title: "Solar Hot Water 500L",
      description: [
        "500L for high-demand applications",
        "Solar-powered for cost savings",
        "Ideal for hotels and industries",
        "Environmentally friendly",
      ],
      link: "/Packages/HotWater",
    },
  ];

  return (
    <div className="image-slider-wrapper">
      <h2 className="slider-heading">Our Products</h2>

      <div className="slider-container">
        {/* First Slider - Left to Right */}
        <div
          className={`slider track-left ${paused1 ? "paused" : ""}`}
          onMouseEnter={() => setPaused1(true)}
          onMouseLeave={() => setPaused1(false)}
        >
          {[...images1, ...images1].map((img, index) => (
            <div key={index} className="slide">
              <div className="flip-container">
                <div className="front">
                  <img src={img} alt={`slide-${index}`} />
                </div>
                <div className="back">
                  <h3>{details[index % details.length].title}</h3>
                  <ul>
                    {details[index % details.length].description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <Link
                    to={details[index % details.length].link}
                    className="see-more-button"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Slider - Right to Left */}
        <div
          className={`slider track-right ${paused2 ? "paused" : ""}`}
          onMouseEnter={() => setPaused2(true)}
          onMouseLeave={() => setPaused2(false)}
        >
          {[...images2, ...images2].map((img, index) => (
            <div key={index} className="slide">
              <div className="flip-container">
                <div className="front">
                  <img src={img} alt={`slide-${index}`} />
                </div>
                <div className="back">
                  <h3>{details[index % details.length].title}</h3>
                  <ul>
                    {details[index % details.length].description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <Link
                    to={details[index % details.length].link}
                    className="see-more-button"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;