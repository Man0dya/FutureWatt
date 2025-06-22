const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  pdfBuffer: { type: Buffer },  // Store generated PDF
  invoiceStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Status field
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
