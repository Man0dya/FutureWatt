import React, { useEffect, useState } from "react";
import {
  Card,
  Grid2,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar"; // Renamed Toolbar to TopBar for consistency

function Home() {
  const [rows, setRows] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [pendingRepairsCount, setPendingRepairsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all orders
    fetch("http://localhost:6001/Order/getAllOrders")
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error("Error fetching orders:", error));

    // Fetch count of pending orders
    fetch("http://localhost:6001/Order/getPendingOrdersCount")
      .then((response) => response.json())
      .then((data) => setPendingOrdersCount(data.count))
      .catch((error) => console.error("Error fetching pending orders count:", error));

    // Fetch count of pending repairs
    fetch("http://localhost:6001/Repair/getPendingRepairsCount")
      .then((response) => response.json())
      .then((data) => setPendingRepairsCount(data.count))
      .catch((error) => console.error("Error fetching pending repairs count:", error));
  }, []);

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
          width: { xs: "100%", sm: `calc(100% - 240px)` }, // Adjust for sidebar width
          mt: { xs: "56px", sm: "64px" }, // Offset for TopBar height
        }}
      >
        <TopBar />

        {/* Cards Section */}
        <Box sx={{ mt: { xs: 2, sm: 3 } }}>
          <Grid2 container spacing={2} justifyContent="center">
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.375rem" },
                    fontWeight: "bold",
                  }}
                >
                  No of Orders (Pending)
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    fontWeight: "bold",
                    color: "#FF7D29",
                  }}
                >
                  {pendingOrdersCount}
                </Typography>
              </Card>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.375rem" },
                    fontWeight: "bold",
                  }}
                >
                  No of Repairs (Pending)
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    fontWeight: "bold",
                    color: "#FF7D29",
                  }}
                >
                  {pendingRepairsCount}
                </Typography>
              </Card>
            </Grid2>
          </Grid2>
        </Box>

        {/* Table Section */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#333",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Recent Payments
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflowX: "auto",
              maxHeight: { xs: "60vh", md: "70vh" },
            }}
          >
            <Table sx={{ minWidth: 500 }} stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Package</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Delivery Location</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Order Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Payment Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.fullName}</TableCell>
                      <TableCell>{order.packageId?.package_name || "N/A"}</TableCell>
                      <TableCell>{order.deliveryLocation}</TableCell>
                      <TableCell>{order.orderStatus}</TableCell>
                      <TableCell>{order.paymentStatus}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#FF7D29",
                            color: "#fff",
                            textTransform: "none",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#E06C00" },
                            width: "100%",
                          }}
                          onClick={() => {
                            if (order.paymentStatus === "Completed") {
                              navigate("/SM_Dashboard_Invoices", { state: { orderDetails: order } }); // Pass order details
                            } else {
                              alert("Wait for payment approval!");
                            }
                          }}
                        >
                          Create Invoice
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="textSecondary">
                        No orders found
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

export default Home;
