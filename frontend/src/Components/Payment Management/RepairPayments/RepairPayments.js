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

function RepairPayments() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
          width: { xs: "100%", sm: `calc(100% - ${240}px)` }, // Adjust for sidebar width
          mt: { xs: "56px", sm: "64px" }, // Offset for TopBar height
        }}
      >
        <TopBar />

        {/* Table Container */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
          >
            Repair Payments
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflowX: "auto", // Scrollable on small screens
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Repair ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "#fafafa" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell>{row.OrderID}</TableCell>
                      <TableCell>{row.Type}</TableCell>
                      <TableCell>${row.Payment?.toLocaleString() || "N/A"}</TableCell>
                      <TableCell sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#FF7D29",
                            color: "#fff",
                            textTransform: "none",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#E06C00" },
                          }}
                        >
                          Check Payment
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#1976D2", // Blue for "Check Order"
                            color: "#fff",
                            textTransform: "none",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#115293" },
                          }}
                        >
                          Check Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="textSecondary">
                        No data available
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

export default RepairPayments;