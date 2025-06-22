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

function LiveReport() {
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
  const [live_description, setLiveDescription] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // New: image state

  const handleCreateReport = async () => {
    if (!live_description || !orderStatus) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("live_description", live_description);
      formData.append("orderStatus", orderStatus);
      if (selectedFile) {
        formData.append("live_image", selectedFile); // file field
      }

      const response = await axios.put(
        `http://localhost:6001/Order/updateLiveReport/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Order Updated:", response.data);
      alert("Report submitted successfully!");
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
            Create Live Installation Report
          </Typography>

          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", backgroundColor: "#fff", maxWidth: "600px", mx: "auto" }}>
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
              value={live_description}
              onChange={(e) => setLiveDescription(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Image Upload Section */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                     Upload Site Image
                    </Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                </Box>


            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={orderStatus === "On Going"} onChange={() => setOrderStatus("On Going")} />}
                label="On Going"
              />
              <FormControlLabel
                control={<Checkbox checked={orderStatus === "Completed"} onChange={() => setOrderStatus("Completed")} />}
                label="Completed"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateReport}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Submit Report
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default LiveReport;
