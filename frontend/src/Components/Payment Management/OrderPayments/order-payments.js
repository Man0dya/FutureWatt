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
} from "@mui/material";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";

function OrderPayments() {
  const [payments, setPayments] = useState([]);


// Fetch all payments
useEffect(() => {
  fetch("http://localhost:6001/Payment/getAllPayments") // ✅ Use the correct URL
    .then((response) => response.json())
    .then((data) => setPayments(data)) // ✅ Show all payments
    .catch((error) => console.error("Error fetching payments:", error));
}, []);

// Function to approve payment
const handleApprovePayment = async (paymentId, orderId) => {
  try {
    // Step 1: Approve payment in Payments database
    const response = await fetch(`http://localhost:6001/Payment/approvePayment/${paymentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      // Step 2: Update order's paymentStatus in Orders database
      const updateOrderResponse = await fetch(`http://localhost:6001/Order/updatePaymentStatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          paymentStatus: "Completed"
        })
      });

      if (updateOrderResponse.ok) {
        // Step 3: Update UI without refreshing
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === paymentId ? { ...payment, paymentStatus: "Completed" } : payment
          )
        );
      } else {
        console.error("Failed to update order payment status.");
      }
    } else {
      console.error("Failed to approve payment.");
    }
  } catch (error) {
    console.error("Error approving payment:", error);
  }
};




  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: { xs: "column", sm: "row" } }}>
      <SideBar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { xs: "100%", sm: `calc(100% - ${240}px)` },
          mt: { xs: "56px", sm: "64px" },
        }}
      >
        <TopBar />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
            Order Payments
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Transaction ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Amount (LKR)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <TableRow
                      key={payment._id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "#fafafa" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell>{payment.orderId}</TableCell>
                      <TableCell>{payment.transactionId}</TableCell>
                      <TableCell>LKR {payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: payment.paymentStatus === "Completed" ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {payment.paymentStatus}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {payment.paymentStatus !== "Completed" ? (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "#fff",
                              textTransform: "none",
                              borderRadius: "8px",
                              "&:hover": { backgroundColor: "#388E3C" },
                            }}
                            onClick={() => handleApprovePayment(payment._id)}
                          >
                            Approve Payment
                          </Button>
                        ) : (
                          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "green" }}>
                            Approved
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body2" color="textSecondary">
                        No payments found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderPayments;
