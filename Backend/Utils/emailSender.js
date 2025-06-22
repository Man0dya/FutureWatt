const nodemailer = require("nodemailer");

// Create transporter with Mailtrap settings
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "695dc4cfe9634f",
      pass: "e8af178cfe3a8d"
    }
  });
// Function to send OTP email
const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: '"FutureWatt Payments" <payments@futurewatt.com>',
    to: toEmail,
    subject: "Your FutureWatt OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to", toEmail);
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
    throw error;
  }
};

module.exports = sendOTPEmail;
