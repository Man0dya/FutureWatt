const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    NIC: { type: String, required: true },
    deliveryLocation: { type: String, required: true },
    orderStatus: { type: String, default: "Pending" },
    paymentStatus: { type: String, default: "Pending" },
    isTechnicianAssigned: { type: Boolean, default: false }, // New field
    tech_description: { type: String, default: "Pending" },
    live_description: { type: String, default: "Pending" },
    live_image: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
