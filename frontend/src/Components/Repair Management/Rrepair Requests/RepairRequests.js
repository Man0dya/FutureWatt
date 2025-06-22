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
  Grid2,
} from "@mui/material";
import SideBar from "../../Repair Management/SideBar/SideBar";
import TopBar from "../../Repair Management/TopBar/TopBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// API URL - replace with your actual endpoint
const REPAIR_REQUESTS_URL = "http://localhost:6001/Repair/getAllRepairs";

function RepairRequests() {
  const [repairRequests, setRepairRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  // Fetch repair requests on component mount
  useEffect(() => {
    axios
      .get(REPAIR_REQUESTS_URL)
      .then((response) => {
        console.log("Repair Requests:", response.data);
        setRepairRequests(response.data);
      })
      .catch((error) => console.error("Error fetching repair requests:", error));
  }, []);



  // Handle selecting a repair request
  const handleCheckRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleGoForRepair = () => {
    if (!selectedRequest) return;
    navigate("/RM_Dashboard_Service_Report", {
      state: {
        repairId: selectedRequest._id,
        customerName: selectedRequest.customerName,
        repairType: selectedRequest.repairType,
        description: selectedRequest.description,
        customerContact: selectedRequest.customerContact,
      },
    });
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
          width: { xs: "100%", sm: `calc(100% - ${240}px)` }, // Adjust for sidebar width
          mt: { xs: "56px", sm: "64px" }, // Offset for TopBar height
          backgroundColor: "#f5f5f5",
        }}
      >
        <TopBar />

        {/* Content Split: Table and Details */}
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
          <Grid2 container spacing={{ xs: 2, md: 3 }}>
            {/* Table Section (Left Half) */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  overflowX: "auto",
                  maxHeight: { xs: "70vh", md: "80vh" },
                }}
              >
                <Table sx={{ minWidth: 400 }} stickyHeader>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Repair ID</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Customer Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {repairRequests.length > 0 ? (
                      repairRequests.map((request) => (
                        <TableRow
                          key={request.id}
                          hover
                          sx={{
                            "&:hover": { backgroundColor: "#fafafa" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <TableCell sx={{ py: 1 }}>{request._id}</TableCell>
                          <TableCell sx={{ py: 1 }}>{request.customerName}</TableCell>
                          <TableCell sx={{ py: 1 }}>{request.repairType}</TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleCheckRequest(request)}
                              sx={{
                                backgroundColor: "#1976D2", // Blue color like Invoices
                                color: "#fff",
                                textTransform: "none",
                                borderRadius: "8px",
                                "&:hover": { backgroundColor: "#115293" },
                                width: "100%",
                              }}
                            >
                              More Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 2 }}>
                          <Typography variant="body2" color="textSecondary">
                            No data available
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid2>

            {/* Details Section (Right Half) */}
            <Grid2 size={{ xs: 14, md: 6 }}>
              <Box
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  height: { xs: "auto", md: "50vh" },
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {selectedRequest ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1rem", md: "1.25rem" } }}
                    >
                      Repair Request Details
                    </Typography>
                    <Grid2 container spacing={2} sx={{ flexGrow: 1 }}>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Repair ID:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest._id}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Customer Name:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.customerName}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Type:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.repairType}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Description:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.description || "N/A"}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Address:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.address || "N/A"}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Contact:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.customerContact || "N/A"}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Status:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.repairStatus || "Pending"}</Typography>
                      </Grid2>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGoForRepair}
                        sx={{ mt: 2, borderRadius: "8px", textTransform: "none" }}
                      >
                        Go for Repair
                      </Button>
                    </Grid2>
                  </>
                ) : (
                  <Typography variant="body1" color="textSecondary" sx={{ flexGrow: 1 }}>
                    Select a repair request to view details
                  </Typography>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
}

export default RepairRequests;

