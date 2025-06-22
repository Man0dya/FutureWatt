import React from 'react';
import './Services.css'; // Import the CSS file

function Services() {
  return (
    <section className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-list">
        <div className="service-item">
          <div className="service-icon">
            {/* Replace with actual icon or image */}
            <span role="img" aria-label="solar-packages">
              🌞
            </span>
          </div>
          <h3 className="service-heading">Browse & Order Solar Packages</h3>
          <p className="service-description">
            Explore a wide range of solar system packages tailored to your energy needs. Customize your selection and place your order online—no office visits required!
          </p>
        </div>
        <div className="service-item">
          <div className="service-icon">
            {/* Replace with actual icon or image */}
            <span role="img" aria-label="calculate-savings">
              💸
            </span>
          </div>
          <h3 className="service-heading">Calculate Savings & Make Secure Payments</h3>
          <p className="service-description">
            Use our cost estimation tool to calculate potential savings before making a decision. Complete your purchase with secure online payment options, including credit cards, bank transfers, and more.
          </p>
        </div>
        <div className="service-item">
          <div className="service-icon">
            {/* Replace with actual icon or image */}
            <span role="img" aria-label="maintenance">
              🔧
            </span>
          </div>
          <h3 className="service-heading">Request Repairs & Maintenance</h3>
          <p className="service-description">
            Facing an issue with your solar system? Submit a repair request online and track the status in real-time. Our expert technicians will ensure quick and reliable service.
          </p>
        </div>
        <div className="service-item">
          <div className="service-icon">
            {/* Replace with actual icon or image */}
            <span role="img" aria-label="track-orders">
              📦
            </span>
          </div>
          <h3 className="service-heading">Track Your Orders & Services</h3>
          <p className="service-description">
            Stay updated on your order progress, installation schedules, and service requests with our real-time tracking feature. Get notified every step of the way!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
