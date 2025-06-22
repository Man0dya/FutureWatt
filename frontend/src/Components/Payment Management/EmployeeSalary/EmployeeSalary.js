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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

pdfMake.vfs = pdfFonts.vfs;

function EmployeeSalary() {
  const [rows, setRows] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [salaryHistory, setSalaryHistory] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [salaryDetails, setSalaryDetails] = useState({
    basicSalary: "",
    bonus: "",
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    fetch("http://localhost:6001/Employee")
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:6001/Salary/getSalaries")
      .then((res) => res.json())
      .then((data) => setSalaryHistory(data))
      .catch((err) => console.error("Error fetching salary history:", err));
  }, []);

  const handleCheckSalary = (employee) => {
    setSelectedEmployee(employee);
    setSalaryDetails({ basicSalary: "", bonus: "" });
  };

  const generatePDF = (salaryData) => {
    const docDefinition = {
      content: [
        { text: "Salary Slip", style: "header", alignment: "center" },
        { text: `Month: ${selectedMonth}`, margin: [0, 10, 0, 10] },
        {
          style: "table",
          table: {
            widths: ["*", "*"],
            body: [
              ["Employee ID", selectedEmployee.EmployeeID],
              ["Name", selectedEmployee.Name],
              ["Basic Salary", `$${salaryData.basicSalary?.toLocaleString() || "N/A"}`],
              ["Bonus", `$${salaryData.bonus?.toLocaleString() || "0"}`],
              ["Net Salary", `$${(salaryData.basicSalary + salaryData.bonus).toLocaleString()}`],
            ]
          },
          layout: "lightHorizontalLines"
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true
        }
      }
    };

    pdfMake.createPdf(docDefinition).download(`${selectedEmployee.Name}_SalarySlip_${selectedMonth}.pdf`);
  };

  const handleCreateSalaryAndGeneratePDF = () => {
    if (
      !selectedEmployee ||
      !selectedEmployee.EmployeeID ||
      !selectedMonth ||
      !selectedYear ||
      !salaryDetails.basicSalary
    ) {
      return alert("Please fill in all the fields to create salary.");
    }

    const salaryData = {
      employeeId: selectedEmployee.EmployeeID,
      name: selectedEmployee.Name,
      month: selectedMonth,
      year: selectedYear,
      basicSalary: parseFloat(salaryDetails.basicSalary),
      bonus: parseFloat(salaryDetails.bonus) || 0,
      netSalary:
        parseFloat(salaryDetails.basicSalary) + (parseFloat(salaryDetails.bonus) || 0),
    };

    fetch("http://localhost:6001/Salary/createSalary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(salaryData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setSalaryDetails({ basicSalary: "", bonus: "" });
        generatePDF(salaryData);
        // Update salary history
        setSalaryHistory((prev) => [...prev, salaryData]);
      })
      .catch((error) => console.error("Error creating salary:", error));
  };

  const handleDeleteSalary = async (id) => {
    if (window.confirm("Are you sure you want to delete this salary entry?")) {
      try {
        const response = await fetch(`http://localhost:6001/Salary/deleteSalary/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();
        alert(data.message);
        setSalaryHistory((prev) => prev.filter((entry) => entry._id !== id));
      } catch (error) {
        console.error("Error deleting salary:", error);
        alert("Failed to delete salary.");
      }
    }
  };

  // Filter employees by search
  const filteredEmployees = rows.filter((row) =>
    row.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: { xs: "column", sm: "row" } }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { xs: "100%", sm: `calc(100% - ${240}px)` },
          mt: { xs: "56px", sm: "64px" },
        }}
      >
        <TopBar />
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
            Employee Salary
          </Typography>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", flex: 1 }}>
              <Box sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  label="Search by Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>
              <Table sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((row) => (
                      <TableRow key={row._id} hover>
                        <TableCell>{row.EmployeeID}</TableCell>
                        <TableCell>{row.Name}</TableCell>
                        <TableCell>
                          <Button variant="contained" size="small" onClick={() => handleCheckSalary(row)}>
                            Create Salary
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No matching employees
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Salary Input Section */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                flex: 1,
              }}
            >
              {selectedEmployee ? (
                <>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Employee Details
                  </Typography>
                  <Typography><strong>Employee ID:</strong> {selectedEmployee.EmployeeID}</Typography>
                  <Typography><strong>Name:</strong> {selectedEmployee.Name}</Typography>

                  <TextField
                    label="Basic Salary"
                    type="number"
                    fullWidth
                    value={salaryDetails.basicSalary}
                    onChange={(e) => setSalaryDetails({ ...salaryDetails, basicSalary: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Bonus Payments"
                    type="number"
                    fullWidth
                    value={salaryDetails.bonus}
                    onChange={(e) => setSalaryDetails({ ...salaryDetails, bonus: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Month</InputLabel>
                    <Select
                      value={selectedMonth}
                      label="Month"
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      {months.map((month) => (
                        <MenuItem key={month} value={month}>{month}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Year</InputLabel>
                    <Select
                      value={selectedYear}
                      label="Year"
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" sx={{ mr: 2 }} onClick={handleCreateSalaryAndGeneratePDF}>
                      Create Salary & Generate Salary Slip
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography>Select an employee to create salary</Typography>
              )}
            </Box>
          </Box>

          {/* Salary History Section */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Salary History
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filter by Month</InputLabel>
                <Select
                  value={filterMonth}
                  label="Filter by Month"
                  onChange={(e) => setFilterMonth(e.target.value)}
                >
                  <MenuItem value="">All Months</MenuItem>
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>{month}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filter by Year</InputLabel>
                <Select
                  value={filterYear}
                  label="Filter by Year"
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <MenuItem value="">All Years</MenuItem>
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Month</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Year</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Basic Salary</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Bonus</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Net Salary</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salaryHistory
                    .filter((entry) =>
                      (filterMonth ? entry.month === filterMonth : true) &&
                      (filterYear ? entry.year === parseInt(filterYear) : true)
                    )
                    .map((entry) => (
                      <TableRow key={entry._id}>
                        <TableCell>{entry.employeeId}</TableCell>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell>{entry.month}</TableCell>
                        <TableCell>{entry.year}</TableCell>
                        <TableCell>LKR {entry.basicSalary.toLocaleString()}</TableCell>
                        <TableCell>LKR {entry.bonus.toLocaleString()}</TableCell>
                        <TableCell>LKR {entry.netSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => handleDeleteSalary(entry._id)}>
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
    </Box>
  );
}

export default EmployeeSalary;
