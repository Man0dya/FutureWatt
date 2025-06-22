import React, { useState, useEffect } from "react";
import axios from "axios";
import futureWattWhite from './FutureWattWhite.png';
import slide1 from './img1.jpg';
import slide2 from './img2.jpg';
import slide3 from './img3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slide1, slide2, slide3];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    nic: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Changed to 5 seconds for a slower, more appealing pace
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMsg = "Invalid email format!";
      }
    }

    if (name === "password") {
      if (value.length < 8) {
        errorMsg = "Password must be at least 8 characters!";
      }
    }

    if (name === "mobile") {
      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(value)) {
        errorMsg = "Mobile number must be 10 digits!";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    
    if (Object.values(errors).some((msg) => msg)) {
      alert("Please fix errors before submitting!");
      return;
    }

    const customerData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      contact: formData.mobile,
      address: formData.address,
      nic: formData.nic
    };

    try {
      const response = await axios.post("http://localhost:6001/Customers", customerData);
      alert(response.data.message || "Account Created Successfully!");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        mobile: "",
        address: "",
        nic: ""
      });

      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <span className="input-highlight"></span>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-highlight"></span>
            </div>
            {errors.email && <p className="error">{errors.email}</p>}

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="input-highlight"></span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}

            <div className="input-group">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
              />
              <span className="input-highlight"></span>
            </div>
            {errors.mobile && <p className="error">{errors.mobile}</p>}

            <div className="input-group">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              <span className="input-highlight"></span>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="nic"
                placeholder="NIC"
                value={formData.nic}
                onChange={handleChange}
              />
              <span className="input-highlight"></span>
            </div>

            <button type="submit">Sign Up</button>
          </form>

          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>

        <div className="auth-image">
          <img src={futureWattWhite} className="signupLogo" alt="SignupLogo" />
          <div className="slideshow-container">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slideshow-image ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide})` }}
              ></div>
            ))}
            <div className="image-overlay"></div>
          </div>
          <h2>Join Us Today!</h2>
          <p>Sign up now and unlock exclusive features!</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;