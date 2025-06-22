import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import offGridImage from "./img1.jpg";
import onGridImage from "./img2.jpg";
import hotWaterImage from "./img3.jpg";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import HowToChoose from './HowToChoose';
// import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import FloatingIcon from "../FloatingIcon/FloatingIcon";
import Chatbot from "../Home/Chatbot/Chatbot";

const ProductTypes = () => {
  const products = [
    {
      name: "On Grid Solar",
      image: onGridImage,
      description: `Connected to the main power grid. Generates electricity and feeds excess energy back to the grid. Helps lower electricity bills through net metering. Ideal for urban and commercial applications.`,
      link: "/Packages/OnGrid",
    },
    {
      name: "Off Grid Solar",
      image: offGridImage,
      description: `Designed for locations without electricity access. Stores energy in batteries for 24/7 power. Ideal for homes, farms, and remote businesses. Reduces reliance on diesel generators.`,
      link: "/Packages/OffGrid",
    },
    {
      name: "Hot Water",
      image: hotWaterImage,
      description: `Uses solar energy to heat water efficiently. Reduces electricity consumption for heating. Suitable for homes, hotels, and industries. Eco-friendly and cost-effective in the long run.`,
      link: "/Packages/HotWater",
    },
  ];

  return (
    <div>
      <Header />
      <div className="product-wrapper">
        <h2 className="product-title">Our Products</h2>
        <div className="product-showcase">
          {products.map((product, index) => (
            <Link
              to={product.link}
              key={index}
              className="product-card"
              style={{ '--delay': `${index * 0.3}s` }}
            >
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="learn-more">
                  Learn More <span className="arrow">→</span>
                </div>
                <p className="product-desc">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <HowToChoose/>
      <div className="help-section">
        <div className="help-content">
          <h2 className="help-title">Need Help Choosing?</h2>
          <p className="help-description">
            Our solar experts are here to guide you to the perfect energy solution. 
            Whether it's off-grid, on-grid, or solar hot water systems, we'll help 
            you find what best fits your needs and budget.
          </p>
          <Link to="/ContactUs" className="help-button">
            Contact Us Now <span className="button-arrow">→</span>
          </Link>
        </div>
      </div>
      <FloatingIcon/>
      <Chatbot/>
      <Footer />
    </div>
  );
};

export default ProductTypes;