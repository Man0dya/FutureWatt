const mongoose = require("mongoose");

// Auto-increment helper
let transactionCounter = 100000; // Start from 100000

const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    default: function () {
      return "TXN" + transactionCounter++;
    },
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
