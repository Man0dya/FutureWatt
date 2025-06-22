const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    package_name: { type: String, required: true },
    description: { type: String, required: true },
    package_type: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Package', packageSchema);