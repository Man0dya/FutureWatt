import React from "react";
import "./Footer.css";
import FutureWatt1 from "./FutureWatt1.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Branding */}
        <div className="footer-brand">
          <img src={FutureWatt1} alt="FutureWatt Logo" />
          <p className="footer-description">
            Powering a sustainable future with reliable and affordable solar solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to = "/">
              <a>Home</a>
              </Link>
              </li>
              
            <li>
            <Link to = "/Packages">
              <a>Packages</a>
              </Link>
            </li>
            <li>
            <Link to = "/AboutUs">
              <a>About Us</a>
              </Link>
            </li>
            <li>
            <Link to = "/ContactUs">
              <a>Contact Us</a>
             </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info with Social Icons */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:support@futurewatt.com">support@futurewatt.com</a></p>
          <p>Phone: <a href="tel:+94123456789">+94 123 456 789</a></p>
          <p>Colombo, Sri Lanka</p>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com"><FaFacebook /></a>
              <a href="https://x.com"><FaTwitter /></a>
              <a href="https://www.instagram.com"><FaInstagram /></a>
              <a href="https://www.linkedin.com"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© KDY_GRP_13. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;