import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import heroBg1 from "./images/bg1.jpg";
import heroBg2 from "./images/bg2.jpg";
import heroBg3 from "./images/bg3.jpg";

const heroData = [
  {
    title: "Clean Energy, Smarter Living.",
    text: "Empowering homes and businesses with innovative energy solutions that reduce waste, lower costs, and protect the planet.",
    image: heroBg1,
  },
  {
    title: "Harness the Power of the Sun",
    text: "Switch to solar and enjoy sustainable energy with lower electricity bills and a greener future.",
    image: heroBg2,
  },
  {
    title: "Innovative Energy for a Better Tomorrow",
    text: "Revolutionizing the way you consume energy with cutting-edge solutions that enhance efficiency and reduce carbon footprints.",
    image: heroBg3,
  },
];

// Preload images to prevent flickering
const preloadImages = (images) => {
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
};
preloadImages([heroBg1, heroBg2, heroBg3]);

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-backgrounds">
        {heroData.map((data, i) => (
          <div
            key={i}
            className={`hero-bg ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${data.image})` }}
          ></div>
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="slide-in">{heroData[index].title}</h1>
        <p className="fade-in-text">{heroData[index].text}</p>
        <button className="hero-btn bounce">
          <Link to="/Packages">Check Packages</Link>
        </button>
      </div>
    </section>
  );
}

export default Hero;