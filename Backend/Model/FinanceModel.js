const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
    month: { type: String, required: true, unique: true }, // Ensures one entry per month
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Finance = mongoose.model("Finance", financeSchema);

module.exports = Finance;
