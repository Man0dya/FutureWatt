import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../../Repair Management/SideBar/SideBar";
import TopBar from "../../Repair Management/TopBar/TopBar";

function ServiceReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedData = location.state || {};

  // Pre-filled values
  const [_id] = useState(receivedData.repairId || "");
  const [customerName] = useState(receivedData.customerName || "");
  const [repairType] = useState(receivedData.repairType || "");
  const [customerContact] = useState(receivedData.customerContact || "");

  // Manually filled values
  const [serviceDescription, setServiceDescription] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [repairStatus, setRepairStatus] = useState("");

  // Service reports list
  const [serviceReports, setServiceReports] = useState([]);

  // Fetch all service reports
  useEffect(() => {
    fetchServiceReports();
  }, []);

  const fetchServiceReports = async () => {
    try {
      const response = await axios.get("http://localhost:6001/Service/getAll");
      setServiceReports(response.data);
    } catch (error) {
      console.error("Error fetching service reports:", error);
    }
  };

  const handleCreateReport = async () => {
    if (!serviceDescription || !totalCost || !repairStatus) {
      alert("Please fill in all fields.");
      return;
    }

    const reportData = {
      repairId: _id,
      customerName,
      repairType,
      customerContact,
      serviceDescription,
      totalCost,
      repairStatus,
      date: new Date().toISOString(),
    };

    try {
      // Step 1: Create the service report
      const reportResponse = await axios.post("http://localhost:6001/Service/create", reportData);
      console.log("Report Response:", reportResponse.data);

      // Step 2: Update repair status
      const statusResponse = await axios.put(`http://localhost:6001/Repair/updateRepairStatus/${_id}`, {
        repairStatus,
      });
      console.log("Repair Status Updated:", statusResponse.data);

      // Step 3: Update repair price
      const priceResponse = await axios.put(`http://localhost:6001/Repair/updatePrice/${_id}`, {
        price: totalCost, // Updating price field
      });
      console.log("Repair Price Updated:", priceResponse.data);

      alert("Service Report Submitted, Repair Status & Price Updated Successfully!");
      fetchServiceReports(); // Refresh the table
      navigate("/RM_Dashboard_Repair_Requests"); // Redirect after successful submission
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit report or update repair details. Please try again.");
    }

    // Reset manually entered fields
    setServiceDescription("");
    setTotalCost("");
    setRepairStatus("");
  };

  const handleDeleteReport = async (serviceId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service report?");
    
    if (!confirmDelete) {
      return; // If user cancels, do nothing
    }
  
    try {
      await axios.delete(`http://localhost:6001/Service/delete/${serviceId}`);
      alert("Service Report Deleted Successfully!");
      fetchServiceReports(); // Refresh the table after deletion
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete the report. Please try again.");
    }
  };
  

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: { xs: "column", sm: "row" } }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { xs: "100%", sm: `calc(100% - ${240}px)` },
          mt: { xs: "56px", sm: "64px" },
          backgroundColor: "#f5f5f5",
        }}
      >
        <TopBar />
        <Box sx={{ mt: { xs: 2, sm: 3 } }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
            Create Service Report
          </Typography>

          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            <TextField fullWidth label="Order ID" value={_id} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
            <TextField fullWidth label="Customer Name" value={customerName} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
            <TextField fullWidth label="Repair Type" value={repairType} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
            <TextField fullWidth label="Contact No" value={customerContact} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />

            <TextField fullWidth label="Service Description" multiline rows={4} value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} sx={{ mb: 2 }} />

            <TextField fullWidth label="Total Cost" type="number" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControlLabel control={<Checkbox checked={repairStatus === "Completed"} onChange={() => setRepairStatus("Completed")} />} label="Completed" />
              <FormControlLabel control={<Checkbox checked={repairStatus === "Rejected"} onChange={() => setRepairStatus("Rejected")} />} label="Rejected" />
            </Box>

            <Button variant="contained" color="primary" fullWidth onClick={handleCreateReport} sx={{ borderRadius: "8px", textTransform: "none" }}>
              Submit Report
            </Button>
          </Paper>

          {/* Service Reports Table */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold", color: "#333" }}>
            Service Reports
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Repair ID</b></TableCell>
                  <TableCell><b>Customer Name</b></TableCell>
                  <TableCell><b>Repair Type</b></TableCell>
                  <TableCell><b>Service Description</b></TableCell>
                  <TableCell><b>Total Cost</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceReports.map((report) => (
                  <TableRow key={report._id}>
                    <TableCell>{report.repairId}</TableCell>
                    <TableCell>{report.customerName}</TableCell>
                    <TableCell>{report.repairType}</TableCell>
                    <TableCell>{report.serviceDescription}</TableCell>
                    <TableCell>LKR {report.totalCost}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDeleteReport(report._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default ServiceReport;
