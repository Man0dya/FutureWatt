import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.css';
import solarHouseImage from './solar-house.jpg'; // Replace with the actual path to your image
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaLaptop, FaEye, FaUserCheck, FaRocket } from 'react-icons/fa';
import FloatingIcon from '../FloatingIcon/FloatingIcon';
import Chatbot from '../Home/Chatbot/Chatbot'
import customerCareImage from './Vibut.jpg';
import paymentManagerImage from './Knucker.jpg';
import salesMarketingImage from './ManO.jpg';
import technicianImage from './Klank.jpg';
import adminImage from './Bhugi.jpg';

const AboutUs = () => {
  const teamMembers = [
    { title: 'Customer Care Manager', name: 'Vibath Jayasundara', image: customerCareImage },
    { title: 'Payment Manager', name: 'Theekshana Rathnayake', image: paymentManagerImage },
    { title: 'Sales and Marketing Manager', name: 'Manodya Dissanayake', image: salesMarketingImage },
    { title: 'Repair Manager', name: 'Amandya Kariyawasam', image: technicianImage },
    { title: 'System Admin', name: 'Bhagya Dunuvila', image: adminImage },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRefs = useRef([]);
  const whyItemRefs = useRef([]);

  // Intersection Observer for general sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Intersection Observer for "Why Choose Us" items
  useEffect(() => {
    const whyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 300); // 300ms delay between each item
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    whyItemRefs.current.forEach((ref) => {
      if (ref) whyObserver.observe(ref);
    });

    return () => {
      whyItemRefs.current.forEach((ref) => {
        if (ref) whyObserver.unobserve(ref);
      });
    };
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <div>
      <Header />
      <div className="about-us-container">
        {/* Top Section (Image + Intro) */}
        <div className="top-section" ref={(el) => (sectionRefs.current[0] = el)}>
          <div className="top-image">
            <img src={solarHouseImage} alt="House with Solar Panels" />
          </div>
          <div className="top-text">
            <h1>About Us</h1>
            <p>
              Welcome to FutureWatt, a pioneering solar energy company dedicated to transforming the way Sri Lanka embraces renewable energy. Founded with a vision to make clean energy accessible to all, we provide innovative solar solutions for households, businesses, and large-scale companies. Our cutting-edge web application streamlines the entire process—from exploring solar packages to managing repairs—ensuring a seamless experience for our customers.
            </p>
          </div>
        </div>

        {/* Our Mission and Vision Section */}
        <div className="section mission-section" ref={(el) => (sectionRefs.current[1] = el)}>
          <div className="mission-vision-container">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p>
                At FutureWatt, our mission is to modernize the solar industry in Sri Lanka by offering a digital platform that simplifies the adoption of solar energy. We aim to empower our customers with tools to browse solar packages, calculate savings, place orders, and request repairs—all online. By replacing outdated manual processes, we enhance efficiency for both customers and employees, driving a sustainable future.
              </p>
            </div>
            <div className="mission-vision-divider"></div>
            <div className="vision-content">
              <h2>Our Vision</h2>
              <p>
                We envision a future where renewable energy powers every home and business in Sri Lanka, creating a cleaner, greener planet for generations to come. Through innovation and technology, we strive to lead the solar industry, making sustainable energy solutions accessible, affordable, and efficient for all.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="section why-choose-us-section" ref={(el) => (sectionRefs.current[2] = el)}>
          <h2>Why Choose Us</h2>
          <div className="why-choose-us-grid">
            <div className="why-item" ref={(el) => (whyItemRefs.current[0] = el)}>
              <FaLaptop className="why-icon" />
              <h3>Digital Convenience</h3>
              <p>
                Our web application lets you explore solar packages, place orders, and manage repairs online—no need for phone calls or in-person visits.
              </p>
            </div>
            <div className="why-item" ref={(el) => (whyItemRefs.current[1] = el)}>
              <FaEye className="why-icon" />
              <h3>Transparency</h3>
              <p>
                Get real-time updates on your orders, payments, and service requests, ensuring clarity at every step.
              </p>
            </div>
            <div className="why-item" ref={(el) => (whyItemRefs.current[2] = el)}>
              <FaUserCheck className="why-icon" />
              <h3>Customer Focus</h3>
              <p>
                We prioritize your needs with personalized solutions, quick support, and tools to calculate your savings.
              </p>
            </div>
            <div className="why-item" ref={(el) => (whyItemRefs.current[3] = el)}>
              <FaRocket className="why-icon" />
              <h3>Efficiency for All</h3>
              <p>
                Our platform streamlines operations for both customers and employees, reducing delays and enhancing satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment to Sustainability Section */}
        <div className="section sustainability-section" ref={(el) => (sectionRefs.current[3] = el)}>
          <h2>Our Commitment to Sustainability</h2>
          <p>
            At FutureWatt, we’re not just providing solar solutions—we’re contributing to a greener planet. By helping households and businesses switch to solar energy, we reduce reliance on fossil fuels and combat climate change. Our operations are designed with sustainability in mind, ensuring that every step we take supports a cleaner, more sustainable future for Sri Lanka and beyond.
          </p>
        </div>

        {/* Our Team Section (Slideshow) */}
        <div className="section team-section" ref={(el) => (sectionRefs.current[4] = el)}>
          <h2>Our Team</h2>
          <div className="team-slideshow">
            <button className="slideshow-btn prev-btn" onClick={handlePrev}>
              ←
            </button>
            <div className="team-slide">
              <img
                src={teamMembers[currentSlide].image}
                alt={teamMembers[currentSlide].title}
                className="team-image"
              />
              <h3>{teamMembers[currentSlide].title}</h3>
              <p>{teamMembers[currentSlide].name}</p>
            </div>
            <button className="slideshow-btn next-btn" onClick={handleNext}>
              →
            </button>
          </div>
        </div>
      </div>
      <FloatingIcon/> 
      <Chatbot/>
      <Footer/>
    </div>
  );
};

export default AboutUs;