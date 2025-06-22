const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    employeeType: { type: String, required: true, enum: ["Payment Manager", "Sales and Marketing Manager", "Repair Manager", "Admin"] },
    password: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
