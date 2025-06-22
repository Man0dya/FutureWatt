const express = require("express");
const router = express.Router();
const OtpController = require("../Controllers/OtpController");

router.post("/send-otp", OtpController.sendOtp);
router.post("/verify-otp", OtpController.verifyOtp);

module.exports = router;
