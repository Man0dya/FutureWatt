import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TextField,
  Grid,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import { generatePDF } from "./InvoicePDF";

function Invoices() {
  const location = useLocation();
  const order = location.state?.orderDetails;

  const [formData, setFormData] = useState({
    orderId: order?._id || "",
    customerName: order?.fullName || "",
    email: order?.email || "",
    phoneNumber: order?.contactNo || "",
    deliveryLocation: order?.deliveryLocation || "",
    price: order?.packagePrice || "",
  });

  const [invoices, setInvoices] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch invoices from the backend
  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:6001/Invoice/getAll");
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // Function to open the PDF in a new tab
  const handleViewPDF = (invoice) => {
    const pdfBlob = new Blob([new Uint8Array(invoice.pdfBuffer.data)], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  // Handle form submission to create an invoice and auto-download PDF
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save invoice to database
      const response = await axios.post("http://localhost:6001/Invoice/create", formData);
      console.log("Invoice Created:", formData);


      // Trigger the PDF generation and auto-download after creation
      generatePDF(formData);

      // Show confirmation message
      setSnackbarMessage("Invoice created successfully and PDF downloaded!");
      setSnackbarOpen(true);

      // Refresh the list of invoices
      fetchInvoices();
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const handleSendEmail = async (invoiceId) => {
    try {
      const response = await axios.post(`http://localhost:6001/Invoice/sendInvoiceEmail/${invoiceId}`);
      setSnackbarMessage("Invoice sent via email successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending email:", error);
      setSnackbarMessage("Failed to send invoice email.");
      setSnackbarOpen(true);
    }
  };
  

  // Fetch invoices on page load
  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "calc(100% - 240px)" }}>
        <TopBar />
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Create Invoice
        </Typography>
        <Grid container spacing={3}>
          {/* Invoice Form */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Invoice Details
              </Typography>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  label="Order ID"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Customer Name"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Delivery Location"
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Price (LKR)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Create Invoice
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>

        {/* Display Approved Invoices */}
        <Typography variant="h6" sx={{ fontWeight: "bold", my: 3 }}>
          Approved Invoices
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Price (LKR)</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices
                .filter((invoice) => invoice.invoiceStatus === "Approved")
                .map((invoice) => (
                  <TableRow key={invoice._id}>
                    <TableCell>{invoice.orderId}</TableCell>
                    <TableCell>{invoice.customerName}</TableCell>
                    <TableCell>{invoice.email}</TableCell>
                    <TableCell>{invoice.phoneNumber}</TableCell>
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{invoice.invoiceStatus}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleViewPDF(invoice)}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        View PDF
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleSendEmail(invoice._id)}
                      >
                        Send Email
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>


        {/* Display All Invoices */}
        <Typography variant="h6" sx={{ fontWeight: "bold", my: 3 }}>
          All Invoices
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Price (LKR)</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>PDF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell>{invoice.orderId}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.email}</TableCell>
                  <TableCell>{invoice.phoneNumber}</TableCell>
                  <TableCell>{invoice.price}</TableCell>
                  <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.invoiceStatus}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewPDF(invoice)} variant="outlined">
                      View PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Snackbar for confirmation */}
        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          autoHideDuration={6000}
        />
      </Box>
    </Box>
  );
}

export default Invoices;
