import React from 'react';
import './WhatsAppButton.css'; // We'll create this CSS file next

const WhatsAppButton = () => {
  // Replace with your desired phone number (include country code without +)
  const phoneNumber = "94706811309";
  // WhatsApp message (optional)
  const message = "Hello! I have a Question ?";
  // WhatsApp link format
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsAppButton;