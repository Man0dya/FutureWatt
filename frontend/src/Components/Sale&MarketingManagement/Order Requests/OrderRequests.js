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
  Typography,
  Button,
} from "@mui/material";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";

function SalesMarketingDashboard() {
  const [orders, setOrders] = useState([]);

  // Fetch orders (only Pending)
  useEffect(() => {
    fetch("http://localhost:6001/Order/getAllOrders")
      .then((response) => response.json())
      .then((data) => {
        // Filter orders with status "Pending"
        const pendingOrders = data.filter((order) => order.orderStatus === "Pending");
        setOrders(pendingOrders);
      })
      .catch((error) => console.error("Error fetching order requests:", error));
  }, []);

  // Assign Technician
  const handleAssignTechnician = async (orderId, isAssigned) => {
    if (isAssigned) {
      alert("Technician already assigned!");
      return;
    }

    const confirmAssign = window.confirm("Are you sure you want to assign a technician?");
    if (!confirmAssign) return;

    try {
      const response = await fetch("http://localhost:6001/Order/updateTechnicianAssignment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Technician assigned successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, isTechnicianAssigned: true } : order
          )
        );
      } else {
        alert(result.message || "Failed to assign technician.");
      }
    } catch (error) {
      console.error("Error updating technician assignment:", error);
      alert("Error assigning technician.");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: { xs: "column", sm: "row" } }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { xs: "100%", sm: `calc(100% - 240px)` },
          mt: { xs: "56px", sm: "64px" },
        }}
      >
        <TopBar />

        {/* Table Section */}
        <Box sx={{ mt: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#333",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Pending Orders
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflowX: "auto",
              maxHeight: { xs: "50vh", md: "70vh" },
            }}
          >
            <Table sx={{ minWidth: 500 }} stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Customer Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Technician Assigned</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow
                      key={order._id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "#fafafa" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell sx={{ py: 1 }}>{order._id}</TableCell>
                      <TableCell sx={{ py: 1 }}>{order.fullName}</TableCell>
                      <TableCell sx={{ py: 1 }}>{order.packageId?.package_type || "N/A"}</TableCell>
                      <TableCell sx={{ py: 1 }}>LKR {order.packageId?.price?.toLocaleString() || "N/A"}</TableCell>
                      <TableCell sx={{ py: 1, color: order.isTechnicianAssigned ? "green" : "red" }}>
                        {order.isTechnicianAssigned ? "Yes" : "No"}
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: order.isTechnicianAssigned ? "gray" : "#FF7D29",
                            color: "#fff",
                            textTransform: "none",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: order.isTechnicianAssigned ? "gray" : "#E06C00" },
                          }}
                          onClick={() => handleAssignTechnician(order._id, order.isTechnicianAssigned)}
                          disabled={order.isTechnicianAssigned}
                        >
                          Assign Technician
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        No pending orders available
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

export default SalesMarketingDashboard;
