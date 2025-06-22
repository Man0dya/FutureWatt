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
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BuildIcon from "@mui/icons-material/Build";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

function SideBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/LoginEmployee"); // Redirect to Login page
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/SM_Dashboard" },
    { text: "Order Requests", icon: <ShoppingCartIcon />, path: "/SM_Dashboard_Order" },
    { text: "Repair Requests", icon: <BuildIcon />, path: "/SM_Dashboard_Repair" },
    { text: "Invoices", icon: <ReceiptIcon />, path: "/SM_Dashboard_Invoices" },
  ];

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
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFF", textAlign: "center", py: 2 }}>
              Sales & Marketing Manager
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
      </Drawer>
    </Box>
  );
}

export default SideBar;
