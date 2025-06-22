const express = require("express");
const { addFinanceData, getFinanceData, deleteFinanceData } = require("../Controllers/FinanceController");

const router = express.Router();

router.post("/addFinance", addFinanceData);  // Add finance data
router.get("/getFinance", getFinanceData);   // Get all finance data

router.delete("/deleteFinance/:id", deleteFinanceData); // Delete finance data

module.exports = router;
