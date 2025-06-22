const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 1000 }, // Start from 1000 (for TXN1000)
});

module.exports = mongoose.model('Counter', counterSchema);
