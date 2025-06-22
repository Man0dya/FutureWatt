import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, TextField, Avatar } from "@mui/material";

function TopBar() {
  const [employeeFullName, setEmployeeFullName] = useState("");

  useEffect(() => {
    const fullName = localStorage.getItem("employeeFullName") || "Employee"; // Default to "Employee" if empty
    setEmployeeFullName(fullName);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        top: 0,
        zIndex: 1200, // Below sidebar toggle on mobile
        ml: { sm: `${240}px` }, // Offset sidebar width on larger screens
        width: { xs: "100%", sm: `calc(100% - ${240}px)` },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, sm: 2 },
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#333", fontWeight: "bold", fontSize: { xs: "1.25rem", md: "1.5rem" } }}
        >
          Hello, {employeeFullName}!
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "#FF7D29", mr: 1 }}>
            {employeeFullName ? employeeFullName.charAt(0).toUpperCase() : "E"} {/* Default to "E" if empty */}
          </Avatar>
          <Typography
            variant="body1"
            sx={{ color: "#333", display: { xs: "none", sm: "block" } }}
          >
            {employeeFullName}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
