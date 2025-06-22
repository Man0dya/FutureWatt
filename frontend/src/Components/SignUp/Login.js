import React, { useState, useEffect } from "react";
import axios from "axios";
import futureWattWhite from './FutureWattWhite.png';
import slide1 from './img1.jpg';
import slide2 from './img2.jpg';
import slide3 from './img3.jpg';
import "./Signup.css"; 
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slide1, slide2, slide3];

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Changed to 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:6001/Customers/login", formData, {
        withCredentials: true,
      });

      localStorage.removeItem("employeeId");
      localStorage.removeItem("employeeFullName");
      localStorage.removeItem("employeeType");
  
      console.log("Full response:", response.data);
  
      if (response.status === 200) {
        const user = response.data.user;
  
        console.log("User data:", user);
  
        if (user && user.id && user.name) {
          localStorage.setItem("customerName", user.name);
          localStorage.setItem("customerId", user.id);
  
          navigate("/");
  
          alert(response.data.message || "Login successful!");
        } else {
          alert("Unexpected response format. User data missing.");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
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

            <button type="submit">Sign In</button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
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
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your journey.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;