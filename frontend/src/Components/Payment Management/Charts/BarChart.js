import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, styled } from "@mui/material";

const ChartContainer = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  padding: theme.spacing(2.5),
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#1e293b",
  marginBottom: theme.spacing(2),
}));

function FinanceBarChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/Finance/getFinance")
      .then((response) => response.json())
      .then((data) => {
        const monthOrder = [
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
        ];

        const sortedData = data.sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );

        setChartData(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <ChartContainer
      sx={{
        height: { xs: "250px", sm: "300px", md: "350px" }, // Responsive height
      }}
    >
      <ChartTitle variant="h6">Financial Overview</ChartTitle>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#64748b" }}
            interval={0} // Show all months
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickFormatter={(value) => `LKR ${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value) => `LKR ${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              border: "none",
            }}
          />
          <Legend
            wrapperStyle={{
              fontSize: 14,
              paddingTop: 10,
            }}
          />
          <Bar
            dataKey="income"
            fill="#22c55e" // Match DashboardHome income color
            barSize={40}
            radius={[4, 4, 0, 0]} // Rounded top edges
          />
          <Bar
            dataKey="expenses"
            fill="#ef4444" // Match DashboardHome expenses color
            barSize={40}
            radius={[4, 4, 0, 0]} // Rounded top edges
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default FinanceBarChart;