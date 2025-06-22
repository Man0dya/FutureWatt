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
import axios from 'axios';

function RepairRequests() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/Repair/getAllRepairs") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => console.error("Error fetching repair requests:", error));
  }, []);

  const handleApproveRepair = async (repairId) => {
    // Find the repair in the state by repairId
    const repair = rows.find(row => row._id === repairId);
  
    // Check if the repair status is already 'Approved'
    if (repair && repair.repairStatus === "Approved") {
      alert("This repair request has already been approved.");
      return; // Exit the function if already approved
    }
  
    // Show confirmation alert box
    const isConfirmed = window.confirm("Are you sure you want to approve this repair request?");
    
    if (isConfirmed) {
      try {
        const response = await axios.put(`http://localhost:6001/Repair/updateRepairStatus/${repairId}`, {
          repairStatus: "Approved",
        });
  
        if (response.status === 200) {
          alert("Repair request approved successfully");
          // Update the local state to reflect the change
          setRows((prevRows) =>
            prevRows.map((row) =>
              row._id === repairId ? { ...row, repairStatus: "Approved" } : row
            )
          );
        }
      } catch (error) {
        console.error("Error approving repair request:", error);
        alert("Failed to approve repair request");
      }
    } else {
      // If the user clicks "Cancel", do nothing
      console.log("Repair request approval canceled");
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
          width: { xs: "100%", sm: `calc(100% - 240px)` }, // Adjust for sidebar width
          mt: { xs: "56px", sm: "64px" }, // Offset for TopBar height
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
            Repair Requests
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflowX: "auto",
              maxHeight: { xs: "60vh", md: "70vh" }, // Scrollable on long lists
            }}
          >
            <Table sx={{ minWidth: 500 }} stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Repair ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Customer Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow
                      key={row._id}
                      hover
                      sx={{
                        "&:hover": { backgroundColor: "#fafafa" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell sx={{ py: 1 }}>{row._id}</TableCell>
                      <TableCell sx={{ py: 1 }}>{row.customerName}</TableCell>
                      <TableCell sx={{ py: 1 }}>{row.repairType}</TableCell>
                      <TableCell sx={{ py: 1 }}>{row.repairStatus}</TableCell>
                      <TableCell sx={{ py: 1 }}>{row.description}</TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleApproveRepair(row._id)} // Approve repair
                          sx={{
                            backgroundColor: "#4CAF50", // Green for approval
                            color: "#fff",
                            textTransform: "none",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#388E3C" },
                            width: "100%", // Full width on small screens
                          }}
                        >
                          Approve Repair
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        No repair requests available
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

export default RepairRequests;
