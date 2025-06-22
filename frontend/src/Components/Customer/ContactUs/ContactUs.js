import React, { useEffect, useRef, useState } from 'react';
import './ContactUs.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import Chatbot from '../Home/Chatbot/Chatbot';
import { FaEnvelope, FaGlobe, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import FloatingIcon from '../FloatingIcon/FloatingIcon';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';

// Create a custom red marker icon
const RedMarkerIcon = L.Icon.extend({
  options: {
    shadowUrl: markerShadowPng,
    iconSize: [38, 62],
    iconAnchor: [19, 62],
    popupAnchor: [0, -62],
  },
});

const redIcon = new RedMarkerIcon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: markerShadowPng,
});

const ContactUs = () => {
  const position = [7.2906, 80.6337]; // Kandy, Sri Lanka
  const markerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:6001/Contact/addContact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, []);

  return (
    <div>
      <Header />
      <div id="fw-contact-main-container" className="contact-container">
        <h1 id="fw-contact-page-title">Contact Us</h1>
        <p id="fw-contact-intro-text" className="intro-text">
          We'd love to hear from you! Reach out anytime.
        </p>

        <div id="fw-contact-info-section" className="contact-details">
          <div id="fw-contact-email-item" className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div className="contact-content">
              <span className="label">Email</span>
              <a href="mailto:futurewatt.solar@gmail.com">futurewatt.solar@gmail.com</a>
            </div>
          </div>

          <div id="fw-contact-website-item" className="contact-item">
            <FaGlobe className="contact-icon" />
            <div className="contact-content">
              <span className="label">Website</span>
              <a href="https://FutureWatt.lk" target="_blank" rel="noopener noreferrer">FutureWatt.lk</a>
            </div>
          </div>

          <div id="fw-contact-mobile-item" className="contact-item">
            <FaPhone className="contact-icon" />
            <div className="contact-content">
              <span className="label">Mobile</span>
              <span>077 123 45 67</span>
            </div>
          </div>

          <div id="fw-contact-address-item" className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <div className="contact-content">
              <span className="label">Visit Us</span>
              <span>123, Kandy, Sri Lanka</span>
            </div>
          </div>
        </div>

        <div id="fw-contact-form-map-section" className="contact-form-map">
          <h2 className="form-title">Do you have any questions?</h2>
          <p className="form-subtitle">We are at your disposal 7 days a week!</p>
          <div className="form-map-wrapper">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your message (optional)"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button type="submit" className="form-submit">SUBMIT</button>
              </form>
            </div>

            <div className="map-container">
              <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={redIcon} ref={markerRef}>
                  <Popup className="custom-popup" autoClose={false} closeOnClick={false} closeButton={false}>
                    123, Kandy, Sri Lanka
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      <FloatingIcon />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default ContactUs;
