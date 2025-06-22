// routes/SalaryRoute.js
const express = require("express");
const router = express.Router();
const SalaryController = require("../Controllers/SalaryController");

// Route to create salary for an employee
router.post("/createSalary", SalaryController.createSalary);

// Route to get salary details of an employee for a specific month
router.get("/getSalary", SalaryController.getSalary);

// In SalaryRoute.js
router.get("/getSalaries", SalaryController.getAllSalaries);

router.delete("/deleteSalary/:id", SalaryController.deleteSalary);


module.exports = router;
