import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import axios from "axios";

const URL = "http://localhost:6001/Finance/addFinance";
const GET_FINANCE_URL = "http://localhost:6001/Finance/getFinance";
const DELETE_FINANCE_URL = "http://localhost:6001/Finance/deleteFinance";

// Styled Components
const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  padding: theme.spacing(3),
  maxWidth: "400px",
  width: "100%",
  mx: "auto",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#3b82f6" },
    "&.Mui-focused fieldset": { borderColor: "#FF7D29" },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
}));

function FinanceForm() {
  const [formData, setFormData] = useState({ month: "", income: "", expenses: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [financeData, setFinanceData] = useState([]);

  // Fetch finance data
  const fetchFinanceData = async () => {
    try {
      const response = await axios.get(GET_FINANCE_URL);
      setFinanceData(response.data);
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(URL, {
        month: String(formData.month),
        income: Number(formData.income),
        expenses: Number(formData.expenses),
      });

      setMessage({ type: "success", text: "Finance data added successfully!" });
      setFormData({ month: "", income: "", expenses: "" });
      fetchFinanceData(); // Refresh the data
    } catch (error) {
      setMessage({ type: "error", text: "Error submitting finance data. Please try again." });
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this finance entry?");
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`${DELETE_FINANCE_URL}/${id}`);
      setMessage({ type: "success", text: "Finance data deleted successfully!" });
      fetchFinanceData(); // Refresh the table
    } catch (error) {
      setMessage({ type: "error", text: "Error deleting finance data." });
    }
  };
  

  useEffect(() => {
    fetchFinanceData();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, minHeight: "100vh" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", sm: `calc(100% - 240px)` },
          mt: { xs: "56px", sm: "64px" },
          p: { xs: 2, sm: 3 },
          backgroundColor: "#fff",
        }}
      >
        <TopBar />
        <Container sx={{ mt: { xs: 2, sm: 5 }, display: "flex", justifyContent: "center" }}>
          <FormWrapper>
            <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: "bold", textAlign: "center", color: "#1e293b" }}>
              Monthly Finance Report
            </Typography>

            {message.text && (
              <Alert severity={message.type} sx={{ mb: 2, fontSize: { xs: "14px", sm: "16px" }, borderRadius: "8px" }}>
                {message.text}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ fontSize: { xs: "14px", sm: "16px" }, color: "#64748b" }}>
                  Month
                </InputLabel>
                <StyledSelect name="month" value={formData.month} onChange={handleChange} required>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>

              <StyledTextField label="Income" name="income" type="number" fullWidth margin="normal" value={formData.income} onChange={handleChange} required />
              <StyledTextField label="Expenses" name="expenses" type="number" fullWidth margin="normal" value={formData.expenses} onChange={handleChange} required />

              <Box sx={{ textAlign: "center", mt: { xs: 2, sm: 3 } }}>
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#FF7D29", color: "#fff", fontSize: { xs: "14px", sm: "16px" }, px: 4, py: 1, borderRadius: "8px", textTransform: "none", fontWeight: 600, "&:hover": { backgroundColor: "#e06b1f", boxShadow: "0 4px 12px rgba(255, 125, 41, 0.3)" } }}>
                  Submit
                </Button>
              </Box>
            </form>
          </FormWrapper>
        </Container>

        {/* Finance Data Table */}
        <Container sx={{ mt: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
            Finance Data
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Income (LKR)</TableCell>
                  <TableCell>Expenses (LKR)</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {financeData.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{data.month}</TableCell>
                    <TableCell>{data.income}</TableCell>
                    <TableCell>{data.expenses}</TableCell>
                    <TableCell>{new Date(data.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(data._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
}

export default FinanceForm;
