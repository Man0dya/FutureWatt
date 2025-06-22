import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Toolbar from "../TopBar/TopBar";
import FinanceBarChart from "../Charts/BarChart";
import {
  Card,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import axios from "axios";

const URL = "http://localhost:6001/Finance/getFinance";

// Styled Components for a Clean, Modern Look
const ModernCard = styled(Card)(({ theme }) => ({
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  padding: theme.spacing(2.5),
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#f9fafb",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e5e7eb",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3b82f6",
  },
}));

const MainContainer = styled(Box)(({ theme }) => ({
  background: "#ffffff", // Changed to white
  minHeight: "100vh",
  padding: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#1e293b",
  marginBottom: theme.spacing(2),
}));

function DashboardHome() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [financeData, setFinanceData] = useState([]);
  const [income, setMonthlyIncome] = useState(0);
  const [expenses, setMonthlyExpenses] = useState(0);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setFinanceData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    const selectedData = financeData.find((data) => data.month === month);
    console.log("Selected Data:", selectedData);
    setMonthlyIncome(selectedData ? selectedData.income : 0);
    setMonthlyExpenses(selectedData ? selectedData.expenses : 0);
  };

  return (
    <MainContainer sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { xs: "100%", sm: `calc(100% - ${240}px)` },
          mt: { xs: "56px", sm: "64px" },
        }}
      >
        <Toolbar />

        {/* Month Selector */}
        <FormControl fullWidth sx={{ mb: 4, maxWidth: "300px" }}>
          <InputLabel sx={{ color: "#64748b" }}>Select Month</InputLabel>
          <StyledSelect
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Select Month"
            sx={{ color: "#1e293b" }}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <MenuItem key={month} value={month} sx={{ color: "#1e293b" }}>
                {month}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>

        {/* Income and Expenses Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ModernCard>
              <Typography variant="subtitle1" sx={{ color: "#64748b", fontWeight: 500 }}>
                Monthly Income
              </Typography>
              <Typography variant="h4" sx={{ color: "#22c55e", fontWeight: 700, mt: 1 }}>
                LKR {income.toLocaleString()}
              </Typography>
            </ModernCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ModernCard>
              <Typography variant="subtitle1" sx={{ color: "#64748b", fontWeight: 500 }}>
                Monthly Expenses
              </Typography>
              <Typography variant="h4" sx={{ color: "#ef4444", fontWeight: 700, mt: 1 }}>
                LKR {expenses.toLocaleString()}
              </Typography>
            </ModernCard>
          </Grid>
        </Grid>

        {/* Financial Overview Chart */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12}>
              <FinanceBarChart />
          </Grid>
        </Grid>
      </Box>
    </MainContainer>
  );
}

export default DashboardHome;