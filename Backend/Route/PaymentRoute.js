const express = require("express");
const router = express.Router();
const {
  createStripeSession,
  confirmPayment,
  getAllPayments,
  approvePayment,
  getPaymentById,
} = require("../Controllers/PaymentController");

// Stripe Payments
router.post("/create-session", createStripeSession);
router.post("/confirm-payment", confirmPayment);
router.get("/getAllPayments", getAllPayments);
router.put("/approvePayment/:paymentId", approvePayment);
router.get("/getPayment/:transactionId", getPaymentById);


module.exports = router;
