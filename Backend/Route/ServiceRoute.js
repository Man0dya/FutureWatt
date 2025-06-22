const express = require("express");
const router = express.Router();
const { createServiceReport, getAllService, deleteService } = require("../Controllers/ServiceController");

router.post("/create", createServiceReport);
router.get("/getAll", getAllService); // FIX: Corrected function reference
router.delete("/delete/:serviceId", deleteService); // FIX: Corrected function reference

module.exports = router;
