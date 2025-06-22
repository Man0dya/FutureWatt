import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import axios from "axios";
import userico from "./icon-4399701_1280.png";

const dummyTestimonials = [
  {
    id: 1,
    name: "Sampath Sisira",
    feedback:
      "Thank you very much for your excellent job. Really appreciate your friendly team and smart work...",
  },
  {
    id: 2,
    name: "Dilini Vipulaguna",
    feedback:
      "Extremely good service. Highly recommended to anyone looking for reliable solar solutions!...",
  },
  {
    id: 3,
    name: "Isuru Wimansa",
    feedback:
      "Excellent service for a reasonable price. I'm very satisfied with their service and highly recommend them...",
  },
  {
    id: 4,
    name: "Channaka Perera",
    feedback:
      "Thank you so much to the team for the excellent support and service. I highly recommend their services...",
  },
  {
    id: 5,
    name: "Nishan Silva",
    feedback:
      "Very professional team. The installation was smooth, and they handled everything efficiently...",
  },
  {
    id: 6,
    name: "Ruwan Fernando",
    feedback:
      "Reliable and affordable solar solutions. Great customer service and high-quality products!...",
  },
];

const TestimonialSlider = () => {
  const [realTestimonials, setRealTestimonials] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:6001/Review/getAllReviews");
        if (response.status === 200) {
          const formatted = response.data.map((review, index) => ({
            id: `real-${index}`,
            name: review.customerName,
            feedback: review.reviewText,
          }));
          setRealTestimonials(formatted);
        }
      } catch (error) {
        console.error("Error fetching real reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const allTestimonials = [ ...realTestimonials,...dummyTestimonials];

  return (
    <div className="testimonial-container">
      <h1 className="testimonial-header">Testimonials</h1>
      <div className="testimonial-slider-wrapper">
        <div className="testimonial-slider">
          {allTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img src={userico} alt="User" className="user-image" />
              <p className="testimonial-text">"{testimonial.feedback}"</p>
              <h4 className="testimonial-name">{testimonial.name}</h4>
            </div>
          ))}
          {allTestimonials.map((testimonial) => (
            <div key={`duplicate-${testimonial.id}`} className="testimonial-card">
              <img src={userico} alt="User" className="user-image" />
              <p className="testimonial-text">"{testimonial.feedback}"</p>
              <h4 className="testimonial-name">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
