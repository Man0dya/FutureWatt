// models/SalaryModel.js
const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    name: String,
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    netSalary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a unique index on employeeId, month, and year
salarySchema.index({ employeeId: 1, month: 1, year: 1 }, { unique: true });




const Salary = mongoose.model("Salary", salarySchema);
module.exports = Salary;
