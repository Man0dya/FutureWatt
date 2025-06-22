const mongoose = require("mongoose");

const RepairSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerContact: { type: String, required: true },
  packageName: { type: String, required: true },
  address: { type: String, required: true },
  repairType: { 
    type: String, 
    enum: ["Panel Damage", "Battery Replacement", "Inverter Issue", "Wiring Problem", "Other"], 
    required: true 
  },
  description: { type: String, required: true },
  price: { type: Number, default: 0 }, // Default value, technician will update it later
  repairStatus: { type: String, enum: ["Pending", "Approved", "Rejected", "Completed"], default: "Pending" }, // New field for status
}, { timestamps: true });

module.exports = mongoose.model("Repair", RepairSchema);
