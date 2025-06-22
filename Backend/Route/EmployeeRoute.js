const express = require("express");
const router = express.Router();
const { createEmployee, getAllEmployees, loginEmployee, getEmployeeById, deleteEmployee, updateEmployee } = require("../Controllers/EmployeeController");

router.post("/create", createEmployee);
router.get("/", getAllEmployees);
router.post("/login", loginEmployee);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
