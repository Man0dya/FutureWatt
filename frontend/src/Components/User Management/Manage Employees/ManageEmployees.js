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
  TextField,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.default.vfs;

function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [formData, setFormData] = useState({
    fullName: "",
    employeeType: "",
    email: "",
    contactNo: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const employeeTypes = [
    "Payment Manager",
    "Sales and Marketing Manager",
    "Repair Manager",
  ];

  const mapEmployee = (emp) => {
    console.log("Mapping employee:", emp); // Debug log to check backend response
    return {
      _id: emp.EmployeeID || emp._id, // Handle both EmployeeID and _id from backend
      fullName: emp.Name || emp.fullName,
      email: emp.Email || emp.email,
      employeeType: emp.Type || emp.employeeType || "",
      contactNo: emp.contactNo || "",
    };
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:6001/Employee")
      .then((response) => {
        console.log("Fetched employees:", response.data); // Debug log
        const mapped = response.data.map(mapEmployee);
        setEmployees(mapped);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setSnackbar({ open: true, message: "Failed to fetch employees", severity: "error" });
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = (emp) => {
    setSelectedEmployee(emp);
    setFormData({
      fullName: emp.fullName || "",
      employeeType: emp.employeeType || "",
      email: emp.email || "",
      contactNo: emp.contactNo || "",
      password: "",
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to update this employee?")) return;

    setLoading(true);
    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    axios
      .put(`http://localhost:6001/Employee/${selectedEmployee._id}`, payload)
      .then((response) => {
        const updated = mapEmployee(response.data);
        setEmployees((prev) =>
          prev.map((emp) => (emp._id === updated._id ? updated : emp))
        );
        setSelectedEmployee(null);
        setFormData({
          fullName: "",
          employeeType: "",
          email: "",
          contactNo: "",
          password: "",
        });
        setSnackbar({ open: true, message: "Employee updated successfully", severity: "success" });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        setSnackbar({ open: true, message: "Failed to update employee", severity: "error" });
        setLoading(false);
      });
  };

  const handleDelete = (employeeId) => {
    if (!employeeId) {
      console.error("Employee ID is undefined");
      setSnackbar({ open: true, message: "Cannot delete: Invalid employee ID", severity: "error" });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    console.log("Deleting employee with ID:", employeeId); // Debug log
    setLoading(true);
    axios
      .delete(`http://localhost:6001/Employee/${employeeId}`)
      .then((response) => {
        console.log("Delete response:", response.data); // Debug log
        setEmployees((prev) => prev.filter((emp) => emp._id !== employeeId));
        if (selectedEmployee && selectedEmployee._id === employeeId) {
          setSelectedEmployee(null);
          setFormData({
            fullName: "",
            employeeType: "",
            email: "",
            contactNo: "",
            password: "",
          });
        }
        setSnackbar({ open: true, message: "Employee deleted successfully", severity: "success" });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        setSnackbar({ open: true, message: "Failed to delete employee", severity: "error" });
        setLoading(false);
      });
  };

  const generatePDF = () => {
  const docDefinition = {
    content: [
      { text: "Employee Details", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*"],
          body: [
            ["Name", "Email", "Type", "Contact No"],
            ...employees.map((emp) => [
              emp.fullName,
              emp.email,
              emp.employeeType,
              emp.contactNo,
            ]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        marginBottom: 10,
      },
    },
  };

  pdfMake.createPdf(docDefinition).download("Employee_Details.pdf");
};


  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: { xs: "column", sm: "row" } }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 2 },
          width: { xs: "100%", sm: `calc(100% - 240px)` },
          mt: { xs: "56px", sm: "64px" },
          bgcolor: "#f4f6f8",
        }}
      >
        <Box sx={{ maxWidth: "1400px", mx: "auto", mt: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
          >
            Manage Employees
          </Typography>

          {loading && (
            <Typography variant="body1" sx={{ textAlign: "center", color: "#666", mb: 3 }}>
              Loading...
            </Typography>
          )}

          <Grid container spacing={2}>
            {/* Table Section */}
            <Grid item xs={12} md={8}>
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <Table stickyHeader>
                  <TableHead sx={{ bgcolor: "#FF7D29" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          fontSize: "0.95rem",
                          py: 1.5,
                          px: 2,
                          borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          fontSize: "0.95rem",
                          py: 1.5,
                          px: 2,
                          borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          fontSize: "0.95rem",
                          py: 1.5,
                          px: 2,
                          borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        Type
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          fontSize: "0.95rem",
                          py: 1.5,
                          px: 2,
                          borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        Update
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          fontSize: "0.95rem",
                          py: 1.5,
                          px: 2,
                        }}
                      >
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.length > 0 ? (
                      employees.map((emp) => (
                        <TableRow
                          key={emp._id}
                          sx={{
                            "&:hover": { bgcolor: "#f9f9f9", cursor: "pointer" },
                            "&:nth-of-type(even)": { bgcolor: "#fefefe" },
                            transition: "background-color 0.2s ease",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontSize: "0.9rem",
                              color: "#333",
                              py: 1.2,
                              px: 2,
                              borderBottom: "1px solid #e0e0e0",
                              borderRight: "1px solid #e0e0e0",
                            }}
                          >
                            {emp.fullName}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "0.9rem",
                              color: "#333",
                              py: 1.2,
                              px: 2,
                              borderBottom: "1px solid #e0e0e0",
                              borderRight: "1px solid #e0e0e0",
                            }}
                          >
                            {emp.email}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "0.9rem",
                              color: "#333",
                              py: 1.2,
                              px: 2,
                              borderBottom: "1px solid #e0e0e0",
                              borderRight: "1px solid #e0e0e0",
                            }}
                          >
                            {emp.employeeType}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "0.9rem",
                              color: "#333",
                              py: 1.2,
                              px: 2,
                              borderBottom: "1px solid #e0e0e0",
                              borderRight: "1px solid #e0e0e0",
                            }}
                          >
                            <IconButton onClick={() => handleUpdateClick(emp)} disabled={loading}>
                              <EditIcon sx={{ color: "#FF7D29" }} />
                            </IconButton>
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "0.9rem",
                              color: "#333",
                              py: 1.2,
                              px: 2,
                              borderBottom: "1px solid #e0e0e0",
                            }}
                          >
                            <IconButton onClick={() => handleDelete(emp._id)} disabled={loading}>
                              <DeleteIcon sx={{ color: "#d32f2f" }} />
                            </IconButton>
                          </TableCell>
                          

                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          align="center"
                          sx={{
                            fontSize: "0.9rem",
                            color: "#666",
                            py: 2,
                            borderBottom: "none",
                          }}
                        >
                          No employees found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                            variant="contained"
                            color="primary"
                            sx={{ mb: 2, mt: 3 }}
                            onClick={generatePDF}
                          >
                            Download All Employees
                          </Button>
            </Grid>

            {/* Update Form Section */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  bgcolor: "#fff",
                  p: { xs: 2, sm: 3 },
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
                    {selectedEmployee ? "Update Employee" : "No Employee Selected"}
                  </Typography>
                  {selectedEmployee && (
                    <Box component="form" onSubmit={handleUpdateSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            variant="outlined"
                            sx={{ bgcolor: "#f9f9f9", borderRadius: "8px" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            select
                            label="Employee Type"
                            name="employeeType"
                            value={formData.employeeType}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            variant="outlined"
                            sx={{ bgcolor: "#f9f9f9", borderRadius: "8px" }}
                          >
                            {employeeTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            variant="outlined"
                            sx={{ bgcolor: "#f9f9f9", borderRadius: "8px" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Contact No"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            variant="outlined"
                            sx={{ bgcolor: "#f9f9f9", borderRadius: "8px" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            disabled={loading}
                            variant="outlined"
                            sx={{ bgcolor: "#f9f9f9", borderRadius: "8px" }}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            disabled={loading}
                            sx={{
                              bgcolor: "#FF7D29",
                              "&:hover": { bgcolor: "#E06C00" },
                              borderRadius: "8px",
                              py: 1.5,
                              fontWeight: "bold",
                            }}
                          >
                            {loading ? "Updating..." : "Update Employee"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ManageEmployees;