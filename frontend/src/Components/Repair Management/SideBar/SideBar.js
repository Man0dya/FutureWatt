import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
  Grid2,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build"; // For Repair Requests
import LocationOnIcon from "@mui/icons-material/LocationOn"; // For On Site Report
import DescriptionIcon from "@mui/icons-material/Description"; // For Service Report
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";


const drawerWidth = 240;

function SideBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);

  const toggleDrawer = () => setOpen(!open);

  

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/RM_Dashboard" },
    { text: "Repair Requests", icon: <BuildIcon />, path: "/RM_Dashboard_Repair_Requests" },
    { text: "On Site Report", icon: <LocationOnIcon />, path: "/RM_Dashboard_On_Site_Report" },
    { text: "Service Report", icon: <DescriptionIcon />, path: "/RM_Dashboard_Service_Report" },
    { text: "Live Order Report", icon: <DescriptionIcon />, path: "/RM_Dashboard_Live_Report" },
  ];

  const logoutItem = { text: "Logout", icon: <ExitToAppIcon />, path: "/logout" };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#FFF", textAlign: "center", py: 2 }}
        >
          Technician
        </Typography>
      </Toolbar>

      {/* Main Menu Items */}
      <List sx={{ p: 1, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#FF7D29",
                m: 1,
                "&:hover": { backgroundColor: "#fff", color: "#111" },
              }}
            >
              <ListItemIcon sx={{ color: "#FFF", minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      
    </Box>
  );

  return (
    <Box>
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1300,
            color: "#FFF",
            backgroundColor: "#FF7D29",
            "&:hover": { backgroundColor: "#E06C00" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#111",
            color: "#FFF",
            boxSizing: "border-box",
            transition: "width 0.2s",
            ...(isMobile && !open && { width: 0 }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default SideBar;