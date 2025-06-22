const nodemailer = require("nodemailer");

let currentOtp = null; // This will store the OTP temporarily
let currentEmail = null; // To verify which email it was sent to
let otpGeneratedAt = null; // To store OTP generation time

// OTP expiration time in milliseconds (5 minutes)
const OTP_EXPIRATION_TIME = 5 * 60 * 1000;

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  currentOtp = otp;
  currentEmail = email;
  otpGeneratedAt = Date.now(); // Store the time the OTP was generated

  // Setup nodemailer transport with your Gmail account and app password
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail's service
    auth: {
      user: "futurewatt.solar@gmail.com", // Your Gmail address
      pass: "cbul cmwy cvac krot", // The generated app password
    },
  });

  const mailOptions = {
    from: '"FutureWatt Solar" <no-reply@futurewatt.com>', // From address
    to: email, // Recipient's email
    subject: "Your OTP for Payment Verification", // Email subject
    text: `Thank you for choosing FutureWatt Solar!\n\nYour OTP for payment verification is: ${otp}\n\nThis OTP is valid for 5 minutes. If you did not request this, please contact us at support@futurewatt.com.\n\nBest regards,\nThe FutureWatt Solar Team`, // Fallback for non-HTML email clients
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: rgb(255, 153, 70);
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header img {
            max-width: 150px;
          }
          .header h1 {
            color: #ffffff;
            margin: 10px 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            color: #333333;
          }
          .content h2 {
            color: #f28c38;
            font-size: 20px;
          }
          .content p {
            line-height: 1.6;
            font-size: 16px;
          }
          .otp-box {
            background-color: #f9f9f9;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #f28c38;
            border-radius: 5px;
            margin: 20px 0;
            letter-spacing: 5px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #f28c38;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #777777;
            font-size: 14px;
            border-top: 1px solid #e0e0e0;
          }
          .footer a {
            color: #f28c38;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
           <h1>FutureWatt</h1>
            <h1>Your OTP for Payment Verification</h1>
          </div>
          <div class="content">
            <h2>Hello!</h2>
            <p>Thank you for choosing <strong>FutureWatt Solar</strong>! To proceed with your payment verification, please use the One-Time Password (OTP) provided below.</p>
            <div class="otp-box">${otp}</div>
            <p>This OTP is valid for 5 minutes. If you did not request this OTP, please contact our support team immediately.</p>
            <a href="mailto:support@futurewatt.com" class="button">Contact Support</a>
          </div>
          <div class="footer">
            <p>FutureWatt Solar<br>
            <a href="mailto:support@futurewatt.com">support@futurewatt.com</a> | 0712345690 <br>
            <a href="https://www.futurewatt.com">www.futurewatt.com</a></p>
            <p>© ${new Date().getFullYear()} FutureWatt Solar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions); // Send OTP email
    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP has expired
  if (Date.now() - otpGeneratedAt > OTP_EXPIRATION_TIME) {
    return res.status(400).json({ message: "OTP has expired. Please request a new OTP." });
  }

  // Log for debugging
  console.log("Received OTP:", otp, "for email:", email);
  console.log("Stored OTP:", currentOtp, "for email:", currentEmail);

  // Check if the email matches the one the OTP was sent to
  if (email !== currentEmail || parseInt(otp) !== currentOtp) {
    return res.status(400).json({ message: "Invalid OTP or email" });
  }

  // Reset OTP and email after successful verification
  currentOtp = null;
  currentEmail = null;
  otpGeneratedAt = null;

  res.status(200).json({ message: "OTP verified successfully!" });
};