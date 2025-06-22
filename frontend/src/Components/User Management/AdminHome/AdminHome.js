import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SideBar from "../SideBar/SideBar";
import axios from "axios";

function AdminHome() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    employeeType: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    employeeType: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const employeeTypes = [
    "Payment Manager",
    "Sales and Marketing Manager",
    "Repair Manager",
    "Admin"
  ];

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value) return "Full Name is required";
        if (value.length < 2) return "Full Name must be at least 2 characters";
        if (!/^[A-Za-z\s]+$/.test(value)) return "Full Name can only contain letters and spaces";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
      case "contactNo":
        if (!value) return "Phone Number is required";
        if (!/^\d{10}$/.test(value)) return "Phone Number must be exactly 10 digits";
        return "";
      case "employeeType":
        if (!value) return "Employee Type is required";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value))
          return "Password must contain uppercase, lowercase, number, and special character";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      contactNo: validateField("contactNo", formData.contactNo),
      employeeType: validateField("employeeType", formData.employeeType),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      setErrorMessage(true);
      return;
    }

    const confirmSubmit = window.confirm("Are you sure you want to add this employee?");
    if (!confirmSubmit) {
      return;
    }

    axios
      .post("http://localhost:6001/Employee/create", formData)
      .then(() => {
        setSuccessMessage(true);
        window.alert("Employee added successfully!");
        setFormData({ fullName: "", email: "", contactNo: "", employeeType: "", password: "" });
        setErrors({ fullName: "", email: "", contactNo: "", employeeType: "", password: "" });
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        setErrorMessage(true);
      });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%", bgcolor: "#f4f6f8" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>Add New Employee</Typography>
        <Card sx={{ borderRadius: "12px", boxShadow: 3, bgcolor: "#fff", p: 3 }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
              <TextField
                select
                label="Employee Type"
                name="employeeType"
                value={formData.employeeType}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                error={!!errors.employeeType}
                helperText={errors.employeeType}
              >
                {employeeTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Phone Number"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                error={!!errors.contactNo}
                helperText={errors.contactNo}
              />
              <TextField
                label="Password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setPasswordVisible(!passwordVisible)} edge="end">
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Button type="submit" variant="contained" sx={{ bgcolor: "#FF7D29", color: "#fff", mt: 2 }}>
                Add Employee
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
        <Alert severity="success" onClose={() => setSuccessMessage(false)}>Employee added successfully!</Alert>
      </Snackbar>
      <Snackbar open={errorMessage} autoHideDuration={3000} onClose={() => setErrorMessage(false)}>
        <Alert severity="error" onClose={() => setErrorMessage(false)}>
          Please correct the errors in the form before submitting.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdminHome;