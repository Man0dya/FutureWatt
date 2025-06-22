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
  Snackbar,
} from "@mui/material";
import axios from "axios";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch invoices from the backend
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:6001/Invoice/getAll");
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // View PDF function
  const handleViewPDF = (pdfBuffer) => {
    if (!pdfBuffer) {
      setSnackbarMessage("PDF not available.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const pdfBlob = new Blob([new Uint8Array(pdfBuffer.data)], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error displaying PDF:", error);
      setSnackbarMessage("Failed to open PDF.");
      setSnackbarOpen(true);
    }
  };

  // Update invoice status
  const handleUpdateStatus = async (invoiceId, status) => {
    try {
      await axios.put(`http://localhost:6001/Invoice/updateInvoiceStatus/${invoiceId}`, { status });

      // Fetch updated invoices to ensure correct status display
      fetchInvoices();

      setSnackbarMessage(`Invoice marked as ${status}`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating invoice status:", error);
      setSnackbarMessage("Failed to update invoice status.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "calc(100% - 240px)" }}>
        <TopBar />
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          All Invoices
        </Typography>

        {/* Invoice Table */}
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <TableRow key={invoice._id}>
                    <TableCell>{invoice.orderId}</TableCell>
                    <TableCell>{invoice.customerName}</TableCell>
                    <TableCell>{invoice.email}</TableCell>
                    <TableCell>{invoice.phoneNumber}</TableCell>
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            invoice.invoiceStatus === "Approved"
                              ? "green"
                              : invoice.invoiceStatus === "Rejected"
                              ? "red"
                              : "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {invoice.invoiceStatus}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleViewPDF(invoice.pdfBuffer)}
                        variant="outlined"
                        sx={{ mr: 1 }}
                      >
                        View PDF
                      </Button>

                      {/* Approve & Reject buttons (Only for Pending Invoices) */}
                      {invoice.invoiceStatus === "Pending" && (
                        <>
                          <Button
                            onClick={() => handleUpdateStatus(invoice._id, "Approved")}
                            variant="contained"
                            color="success"
                            sx={{ mr: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleUpdateStatus(invoice._id, "Rejected")}
                            variant="contained"
                            color="error"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No invoices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Snackbar for Notifications */}
        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          autoHideDuration={4000}
        />
      </Box>
    </Box>
  );
}

export default Invoices;
