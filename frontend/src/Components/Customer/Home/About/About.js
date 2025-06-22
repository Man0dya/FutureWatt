// About.js
import React from "react";
import "./About.css";
import secondImg from "./secondImg.png"

function About() {
  return (
    <section className="about-section">
      <div className="about-image-container">
        <img src={secondImg} alt="Solar Energy" className="about-image" />
      </div>
      <div className="about-text-container">
        <h2 className="about-title">FutureWatt</h2>
        <p className="about-tagline">Sri Lanka's <span className="highlight-text">#01</span> Solar Provider</p>
        <p className="about-description">
          Empowering homes and businesses with innovative energy solutions that reduce waste, lower costs, and protect the planet because a sustainable future starts today.
        </p>
      </div>
    </section>
  );
}

export default About;