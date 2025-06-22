import React, { useState } from "react";
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
} from "@mui/material";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";

import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.default.vfs;


function OnSiteReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedData = location.state || {};

  // Pre-filled values
  const [_id] = useState(receivedData.orderId || "");
  const [fullName] = useState(receivedData.fullName || "");
  const [email] = useState(receivedData.email || "");
  const [contactNo] = useState(receivedData.contactNo || "");
  const [deliveryLocation] = useState(receivedData.deliveryLocation || "");

  // Manually filled values
  const [tech_description, setTechDescription] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const handleCreateReport = async () => {
    if (!tech_description || !orderStatus) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Update the order in the backend
      const response = await axios.put(`http://localhost:6001/Order/updateTechReport/${_id}`, {
        tech_description,
        orderStatus,
      });

      console.log("Order Updated:", response.data);

      // Generate PDF
      const docDefinition = {
        content: [
          { text: "On Site Service Report", style: "header" },
          { text: `\nOrder ID: ${_id}` },
          { text: `Customer Name: ${fullName}` },
          { text: `Email: ${email}` },
          { text: `Contact No: ${contactNo}` },
          { text: `Delivery Location: ${deliveryLocation}` },
          { text: `\nDescription:\n${tech_description}` },
          { text: `\nStatus: ${orderStatus}` },
          { text: `\nReport Date: ${new Date().toLocaleString()}` },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
            margin: [0, 0, 0, 20],
          },
        },
      };

      pdfMake.createPdf(docDefinition).download(`OnSite_Report_${_id}.pdf`);

      alert("Report submitted and downloaded successfully!");
      navigate("/RM_Dashboard");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to submit report. Please try again.");
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
            Create On Site Report
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
            <TextField fullWidth label="Customer Name" value={fullName} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" value={email} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
            <TextField fullWidth label="Contact No" value={contactNo} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
            <TextField fullWidth label="Delivery Location" value={deliveryLocation} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={tech_description}
              onChange={(e) => setTechDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={orderStatus === "Approved"} onChange={() => setOrderStatus("Approved")} />}
                label="Approved"
              />
              <FormControlLabel
                control={<Checkbox checked={orderStatus === "Rejected"} onChange={() => setOrderStatus("Rejected")} />}
                label="Rejected"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateReport}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Submit & Download Report
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default OnSiteReport;
