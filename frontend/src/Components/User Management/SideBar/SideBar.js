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
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // For Add Employee
import PeopleIcon from "@mui/icons-material/People"; // For Manage Employee
import AddBoxIcon from "@mui/icons-material/AddBox"; // For Add Package
import InventoryIcon from "@mui/icons-material/Inventory"; // For Manage Packages
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
    { text: "Add Employee", icon: <PersonAddIcon />, path: "/AD_dashboard" },
    { text: "Manage Employee", icon: <PeopleIcon />, path: "/AD_Dashboard_Manage_EMP" },
    { text: "Add Package", icon: <AddBoxIcon />, path: "/AD_Dashboard_Add_PKG" },
    { text: "Manage Packages", icon: <InventoryIcon />, path: "/AD_Dashboard_Manage_PKG" },
    { text: "User Reviews", icon: <PeopleIcon />, path: "/AD_Dashboard_Reviews" },
    { text: "Questions", icon: <PeopleIcon />, path: "/AD_Dashboard_Contact" },
  ];

  const logoutItem = { text: "Logout", icon: <ExitToAppIcon />, path: "/logout" };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#FFF", textAlign: "center", py: 2 }}
        >
          Administrator
        </Typography>
      </Toolbar>
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