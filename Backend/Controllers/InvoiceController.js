const Invoice = require("../Model/InvoiceModel");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

// Create an invoice with PDF generation
const createInvoice = async (req, res) => {
  try {
    const {
      orderId,
      customerName,
      email,
      phoneNumber,
      deliveryLocation,
      price,
    } = req.body;

    // Create a new invoice entry in the database
    const newInvoice = new Invoice({
      orderId,
      customerName,
      email,
      phoneNumber,
      deliveryLocation,
      price,
      createdAt: new Date(),
    });

    // Generate PDF
    const doc = new PDFDocument();
    const pdfChunks = [];

    doc.on("data", (chunk) => pdfChunks.push(chunk)); // Collect the chunks of the PDF
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(pdfChunks); // Concatenate the chunks into a single Buffer

      // Save PDF to database as Buffer
      newInvoice.pdfBuffer = pdfBuffer;

      // Save the invoice with PDF buffer
      await newInvoice.save();
      res
        .status(201)
        .json({ message: "Invoice created successfully", invoice: newInvoice });
    });

    // Add content to the PDF
    doc
      .fontSize(18)
      .text(`Invoice for Order ID: ${orderId}`, { align: "center" });
    doc.fontSize(12).text(`Customer: ${customerName}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phoneNumber}`);
    doc.text(`Delivery Location: ${deliveryLocation}`);
    doc.text(`Price: LKR ${price}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);

    // Finalize and end the PDF document
    doc.end();
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Error creating invoice" });
  }
};

// Get all invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  }
};

// Update invoice status
const updateInvoiceStatus = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { status } = req.body;

    // Ensure valid status
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid invoice status." });
    }

    // Update the invoice status
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { invoiceStatus: status },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    res
      .status(200)
      .json({
        message: `Invoice status updated to ${status}`,
        invoice: updatedInvoice,
      });
  } catch (error) {
    console.error("Error updating invoice status:", error);
    res.status(500).json({ message: "Failed to update invoice status." });
  }
};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "futurewatt.solar@gmail.com",
    pass: "cbul cmwy cvac krot",
  },
});

// Send invoice email with HTML template
const sendInvoiceEmail = async (req, res) => {
  try {
    const { id } = req.params;

    // Get invoice by ID
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (!invoice.pdfBuffer) {
      return res.status(400).json({ message: "Invoice PDF not available" });
    }

    // Email options with HTML template
    const mailOptions = {
      from: '"FutureWatt Solar" <no-reply@futurewatt.com>',
      to: invoice.email,
      subject: `Invoice for Order ID: ${invoice.orderId}`,
      text: `Dear ${invoice.customerName},\n\nThank you for choosing FutureWatt Solar! Attached is your invoice for Order ID: ${invoice.orderId}. Please review the details at your convenience.\n\nIf you have any questions, contact us at support@futurewatt.com.\n\nBest regards,\nThe FutureWatt Solar Team`, // Fallback for non-HTML email clients
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color:rgb(255, 153, 70);
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header img {
              max-width: 150px;
            }
            .header h1 {
              color: #ffffff;
              margin: 10px 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
              color: #333333;
            }
            .content h2 {
              color: #f28c38;
              font-size: 20px;
            }
            .content p {
              line-height: 1.6;
              font-size: 16px;
            }
            .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #f28c38;
            color: #ffffff !important; /* Updated line to ensure text is white */
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
          }
            .footer {
              text-align: center;
              padding: 20px;
              color: #777777;
              font-size: 14px;
              border-top: 1px solid #e0e0e0;
            }
            .footer a {
              color: #f28c38;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://res.cloudinary.com/dkqykjfns/image/upload/v1747239757/FutureWattWhite_hv6nin.png" alt="FutureWatt Solar Logo">
              <h1>Invoice for Order ID: ${invoice.orderId}</h1>
            </div>
            <div class="content">
              <h2>Dear ${invoice.customerName},</h2>
              <p>Thank you for choosing <strong>FutureWatt Solar</strong>! We are delighted to serve you.</p>
              <p>Attached to this email, you will find your invoice for Order ID: ${
                invoice.orderId
              }. Please review the details at your convenience.</p>
              <p>If you have any questions or need assistance, our team is here to help. Feel free to reach out to us at any time.</p>
              <a href="mailto:support@futurewatt.com" class="button">Contact Support</a>
            </div>
            <div class="footer">
              <p>FutureWatt Solar<br>
              <a href="mailto:support@futurewatt.com">support@futurewatt.com</a> | 0712345690 <br>
              <a href="https://www.futurewatt.com">www.futurewatt.com</a></p>
              <p>© ${new Date().getFullYear()} FutureWatt Solar. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `Invoice-${invoice.orderId}.pdf`,
          content: invoice.pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Invoice email sent successfully" });
  } catch (error) {
    console.error("Failed to send invoice email:", error);
    res.status(500).json({ message: "Failed to send invoice email" });
  }
};

// Get invoices by customer email
const getInvoicesByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const invoices = await Invoice.find({ email });
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices by email:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  }
};


module.exports = {
  createInvoice,
  getInvoices,
  updateInvoiceStatus,
  sendInvoiceEmail,
  getInvoicesByEmail,
};
