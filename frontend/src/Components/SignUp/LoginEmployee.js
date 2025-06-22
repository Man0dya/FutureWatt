import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginEmployee.css";
import futureWattWhite from './FutureWattWhite.png'; // Ensure you have this image
import slide1 from './img1.jpg'; // Replace with your images
import slide2 from './img2.jpg';
import slide3 from './img3.jpg';

const LoginEmployee = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const slides = [slide1, slide2, slide3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Slide changes every 5 seconds
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:6001/Employee/login", { email, password });
            const { employeeId, employeeType, employeeFullName } = response.data;

            localStorage.removeItem("customerId");
            localStorage.removeItem("customerName");

            localStorage.setItem("employeeId", employeeId);
            localStorage.setItem("employeeType", employeeType);
            localStorage.setItem("employeeFullName", employeeFullName);

            if (employeeType === "Payment Manager") {
                navigate("/PMdashboard");
            } else if (employeeType === "Sales and Marketing Manager") {
                navigate("/SM_Dashboard");
            } else if (employeeType === "Repair Manager") {
                navigate("/RM_Dashboard");
            }
            else if (employeeType === "Admin") {
                navigate("/AD_Dashboard");
            } else {
                setErrorMessage("Invalid employee type");
            }
        } catch (error) {
            setErrorMessage("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-form">
                    <h2>Employee Login</h2>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span className="input-highlight"></span>
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="input-highlight"></span>
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <div className="auth-image">
                    <img src={futureWattWhite} className="signupLogo" alt="Employee Login Logo" />
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
                    <h2>Welcome, Employee!</h2>
                    <p>Sign in to access your dashboard.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginEmployee;