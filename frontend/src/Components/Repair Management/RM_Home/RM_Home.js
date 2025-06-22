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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "../../Repair Management/SideBar/SideBar";
import TopBar from "../../Repair Management/TopBar/TopBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Fix for Leaflet marker icons
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// API URL - replace with your actual endpoint
const ORDER_REQUESTS_URL = "http://localhost:6001/Order/getAllOrders";

// Map container style
const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
  marginTop: "24px",
};

function RepairRequests() {
  const [repairRequests, setRepairRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [mapCenter, setMapCenter] = useState([7.2906, 80.6337]); // Default: Kandy, Sri Lanka
  const navigate = useNavigate();

  // Fetch repair requests on component mount
  useEffect(() => {
    axios
      .get(ORDER_REQUESTS_URL)
      .then((response) => {
        console.log("Order Requests:", response.data);
        setRepairRequests(response.data);
      })
      .catch((error) => console.error("Error fetching order requests:", error));
  }, []);

  // Update map center when a request is selected
  useEffect(() => {
    if (selectedRequest && selectedRequest.deliveryLocation) {
      // For simplicity, using default coordinates (replace with geocoding if needed)
      setMapCenter([7.2906, 80.6337]); // Kandy, Sri Lanka
      // To use actual geocoding, you can integrate a free geocoding service like Nominatim:
      /*
      axios
        .get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(selectedRequest.deliveryLocation)}`)
        .then((response) => {
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setMapCenter([parseFloat(lat), parseFloat(lon)]);
          }
        })
        .catch((error) => console.error("Error geocoding address:", error));
      */
    } else {
      setMapCenter([7.2906, 80.6337]); // Default center: Kandy, Sri Lanka
    }
  }, [selectedRequest]);

  // Handle selecting a repair request
  const handleMoreDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleGoForSiteVisit = () => {
    if (!selectedRequest) return;
    navigate("/RM_Dashboard_On_Site_Report", {
      state: {
        orderId: selectedRequest._id,
        fullName: selectedRequest.fullName,
        email: selectedRequest.email,
        contactNo: selectedRequest.contactNo,
        deliveryLocation: selectedRequest.deliveryLocation,
      },
    });
  };

  const handleGoForInstallation = () => {
    if (!selectedRequest) return;
    navigate("/RM_Dashboard_Live_Report", {
      state: {
        orderId: selectedRequest._id,
        fullName: selectedRequest.fullName,
        email: selectedRequest.email,
        contactNo: selectedRequest.contactNo,
        deliveryLocation: selectedRequest.deliveryLocation,
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
            Order Requests
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
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Customer Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Contact No</TableCell>
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
                          <TableCell sx={{ py: 1 }}>{request.fullName}</TableCell>
                          <TableCell sx={{ py: 1 }}>{request.contactNo}</TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleMoreDetails(request)}
                              sx={{
                                backgroundColor: "#1976D2",
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
            <Grid2 size={{ xs: 12, md: 6 }}>
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
                      Order Request Details
                    </Typography>
                    <Grid2 container spacing={2} sx={{ flexGrow: 1 }}>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Order ID:</strong>
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
                        <Typography variant="body1">{selectedRequest.fullName}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Email:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.email || "N/A"}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Contact No:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.contactNo || "N/A"}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Delivery Location:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.deliveryLocation || "N/A"}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">
                          <strong>Order Status:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography variant="body1">{selectedRequest.orderStatus || "Pending"}</Typography>
                      </Grid2>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGoForSiteVisit}
                        sx={{ mt: 2, borderRadius: "8px", textTransform: "none" }}
                      >
                        Go for Site Visit
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGoForInstallation}
                        sx={{ mt: 2, borderRadius: "8px", textTransform: "none", ml: 2 }}
                      >
                        Go for Installation
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

          {/* Leaflet Map Section */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              Location Map
            </Typography>
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={mapContainerStyle}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {selectedRequest && selectedRequest.deliveryLocation && (
                <Marker position={mapCenter}>
                  <Popup>{selectedRequest.deliveryLocation}</Popup>
                </Marker>
              )}
            </MapContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RepairRequests;