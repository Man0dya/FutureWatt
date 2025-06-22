import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid2,
  TextField,
  MenuItem,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import SideBar from "../SideBar/SideBar";
import axios from "axios";

function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filterType, setFilterType] = useState("All");

  const [formData, setFormData] = useState({
    package_name: "",
    package_type: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const packageTypes = [
    "Off Grid Solar Electricity System",
    "On Grid Solar Electricity System",
    "Hot Water System",
  ];

  // Fetch packages on mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:6001/Package")
      .then((response) => {
        setPackages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setLoading(false);
      });
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update button click
  const handleUpdateClick = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      package_name: pkg.package_name || "",
      package_type: pkg.package_type || "",
      description: pkg.description || "",
      price: pkg.price || "",
    });
  };

  // Handle update submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to update this package?")) {
      return;
    }
    setLoading(true);
    axios
      .put(`http://localhost:6001/Package/${selectedPackage._id}`, formData)
      .then((response) => {
        setPackages((prev) =>
          prev.map((pkg) => (pkg._id === selectedPackage._id ? response.data : pkg))
        );
        setSelectedPackage(null);
        setFormData({
          package_name: "",
          package_type: "",
          description: "",
          price: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating package:", error);
        setLoading(false);
      });
  };

  // Handle delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) {
      return;
    }
    setLoading(true);
    axios
      .delete(`http://localhost:6001/Package/${id}`)
      .then(() => {
        setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
        if (selectedPackage && selectedPackage._id === id) {
          setSelectedPackage(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting package:", error);
        setLoading(false);
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
          width: { xs: "100%", sm: `calc(100% - 240px)` },
          mt: { xs: "56px", sm: "64px" },
          bgcolor: "#f4f6f8",
        }}
      >

        {/* Content Section */}
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
            Manage Packages
          </Typography>

          <Box sx={{ mb: 2 }}>
            <TextField
              select
              label="Filter by Package Type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              fullWidth
              sx={{ maxWidth: 300 }}
            >
              <MenuItem value="All">All Types</MenuItem>
              {packageTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Box>


          {loading && (
            <Typography variant="body1" sx={{ textAlign: "center", color: "#666", mb: 2 }}>
              Loading...
            </Typography>
          )}
          <Grid2 container spacing={3}>
            {/* Table Section (66%) */}
            <Grid2 size={{ xs: 12, md: 8 }}>
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  maxHeight: { xs: "60vh", md: "70vh" },
                  overflowX: "auto",
                }}
              >
                <Table stickyHeader sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Package Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Price (LKR)</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Update</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333", py: 1 }}>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {packages.length > 0 ? (
                      packages
                      .filter(pkg => filterType === "All" || pkg.package_type === filterType)
                      .map((pkg) => (
                    
                        <TableRow
                          key={pkg.id}
                          hover
                          sx={{ "&:hover": { bgcolor: "#fafafa" }, transition: "background-color 0.2s" }}
                        >
                          <TableCell sx={{ py: 1 }}>{pkg.package_name}</TableCell>
                          <TableCell sx={{ py: 1 }}>{pkg.package_type}</TableCell>
                          <TableCell sx={{ py: 1 }}>{pkg.price}</TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <IconButton onClick={() => handleUpdateClick(pkg)} disabled={loading}>
                              <EditIcon sx={{ color: "#FF7D29" }} />
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <IconButton onClick={() => handleDelete(pkg._id)} disabled={loading}>
                              <DeleteIcon sx={{ color: "#d32f2f" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
                          <Typography variant="body2" color="textSecondary">
                            No packages found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid2>

            {/* Update Form Section (33%) */}
            <Grid2 size={{ xs: 12, md: 4 }}>
              {selectedPackage ? (
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    bgcolor: "#fff",
                    p: { xs: 2, md: 3 },
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        color: "#333",
                        fontSize: { xs: "1rem", md: "1.25rem" },
                      }}
                    >
                      Update Package
                    </Typography>
                    <Box component="form" onSubmit={handleUpdateSubmit}>
                      <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                          <TextField
                            label="Package Name"
                            name="package_name"
                            value={formData.package_name}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            disabled={loading}
                          />
                        </Grid2>
                        <Grid2 size={12}>
                          <TextField
                            select
                            label="Package Type"
                            name="package_type"
                            value={packageTypes.includes(formData.package_type) ? formData.packageType : ""}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            disabled={loading}
                          >
                            {packageTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid2>
                        <Grid2 size={12}>
                          <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={3}
                            disabled={loading}
                          />
                        </Grid2>
                        <Grid2 size={12}>
                          <TextField
                            label="Price (LKR)"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            inputProps={{ min: 0, step: "0.01" }}
                            disabled={loading}
                          />
                        </Grid2>
                        <Grid2 size={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              bgcolor: "#FF7D29",
                              color: "#fff",
                              textTransform: "none",
                              borderRadius: "8px",
                              "&:hover": { bgcolor: "#E06C00" },
                              mt: 2,
                              px: 4,
                              py: 1,
                            }}
                            disabled={loading}
                          >
                            Update Package
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setSelectedPackage(null)}
                            sx={{ mt: 2, ml: 2, borderRadius: "8px", textTransform: "none" }}
                            disabled={loading}
                          >
                            Cancel
                          </Button>
                        </Grid2>
                      </Grid2>
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", color: "#666", mt: 2 }}
                >
                  Select a package to update
                </Typography>
              )}
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
}

export default ManagePackages;