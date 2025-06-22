// controllers/ContactController.js
const Contact = require('../Model/ContactModel');
const nodemailer = require("nodemailer");

// Add a new contact message
const addContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error adding contact message:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all contact messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving contact messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "futurewatt.solar@gmail.com",
      pass: "cbul cmwy cvac krot", // Make sure to replace this with your app password or a secure method
    },
  });
  
  const sendReply = async (req, res) => {
    try {
      const { messageId, replyMessage, customerEmail } = req.body;
  
      // Send the email using Nodemailer
      const mailOptions = {
        from: "futurewatt.solar@gmail.com",
        to: customerEmail,
        subject: `Reply to Your Contact Message`,
        text: replyMessage,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending reply:", error);
          return res.status(500).json({ error: "Failed to send reply" });
        }
        
        res.status(200).json({ message: "Reply sent successfully!" });
      });
    } catch (error) {
      console.error("Error sending reply:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  module.exports = { addContactMessage, getAllMessages, sendReply };
