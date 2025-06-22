const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    repairId: { type: mongoose.Schema.Types.ObjectId, ref: "Repair", required: true },
    customerName: { type: String, required: true },
    repairType: { type: String, required: true },
    customerContact: { type: String, required: true },
    serviceDescription: { type: String, required: true },
    totalCost: { type: Number, required: true },
    repairStatus: { type: String, enum: ["Completed", "Rejected"], required: true },
    date: { type: Date, default: Date.now },
  },
  { collection: "ServiceReports" }
);

module.exports = mongoose.model("Service", ServiceSchema);
