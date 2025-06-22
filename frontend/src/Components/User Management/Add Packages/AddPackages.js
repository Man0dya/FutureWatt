import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid2,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import SideBar from "../SideBar/SideBar";
import axios from "axios";

function AddPackages() {
  const [formData, setFormData] = useState({
    package_name: "",
    package_type: "",
    description: "",
    price: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severity of the Snackbar (success or error)

  const packageTypes = [
    "Off Grid Solar Electricity System",
    "On Grid Solar Electricity System",
    "Hot Water System",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to add this package?")) {
      return;
    }
    axios
      .post("http://localhost:6001/Package", formData) // Corrected endpoint
      .then((response) => {
        console.log("Package added:", response.data);
        setFormData({
          package_name: "",
          package_type: "",
          description: "",
          price: "",
        });

        // Show success message in Snackbar
        setSnackbarMessage("New package added successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error adding package:", error);

        // Show error message in Snackbar
        setSnackbarMessage("Failed to add package. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
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

        {/* Form Section */}
        <Box sx={{ mt: { xs: 2, sm: 3 }, maxWidth: "800px", mx: "auto" }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#333",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Add New Package
          </Typography>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              bgcolor: "#fff",
              p: { xs: 2, md: 3 },
            }}
          >
            <CardContent>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      label="Package Name"
                      name="package_name" // Corrected field name
                      value={formData.package_name} // Corrected field name
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      sx={{ bgcolor: "#fff" }}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      select
                      label="Package Type"
                      name="package_type" // Corrected field name
                      value={formData.package_type} // Corrected field name
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      sx={{ bgcolor: "#fff" }}
                    >
                      {packageTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
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
                      sx={{ bgcolor: "#fff" }}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      label="Price (LKR)"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      inputProps={{ min: 0, step: "0.01" }} // Allow decimals
                      sx={{ bgcolor: "#fff" }}
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
                        py: 1.5,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                      }}
                    >
                      Add Package
                    </Button>
                  </Grid2>
                </Grid2>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Snackbar for success/error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // 6 seconds
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddPackages;
