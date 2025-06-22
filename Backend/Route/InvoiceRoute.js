// routes/InvoiceRoute.js
const express = require("express");
const { createInvoice, getInvoices, updateInvoiceStatus, sendInvoiceEmail, getInvoicesByEmail } = require("../Controllers/InvoiceController");

const router = express.Router();

// POST route to create an invoice
router.post("/create", createInvoice);

// GET route to fetch all invoices
router.get("/getAll", getInvoices);

router.put("/updateInvoiceStatus/:invoiceId", updateInvoiceStatus);

router.post("/sendInvoiceEmail/:id", sendInvoiceEmail);

router.get("/getInvoices/:email", getInvoicesByEmail);


module.exports = router;
