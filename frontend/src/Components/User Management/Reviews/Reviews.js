import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import SideBar from "../SideBar/SideBar";
import axios from "axios";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:6001/Review/getAllReviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setSnackbarMessage("Failed to load reviews.");
        setOpenSnackbar(true);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: { xs: "column", sm: "row" } }}>
      <SideBar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { xs: "100%", sm: `calc(100% - 240px)` },
          mt: { xs: "56px", sm: "64px" },
          bgcolor: "#f4f6f8",
        }}
      >
        <Box sx={{ mt: 3, maxWidth: "1000px", mx: "auto" }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
          >
            Customer Reviews
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead
                sx={{
                  bgcolor: "#ffffff",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#111",
                      fontSize: "0.95rem",
                      py: 1.5,
                      px: 2, // Increased padding for spacing
                      borderRight: "1px solid rgba(255, 255, 255, 0.2)", // Light vertical separator
                    }}
                  >
                    Customer Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#111",
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
                      color: "#111",
                      fontSize: "0.95rem",
                      py: 1.5,
                      px: 2,
                      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Package
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#111",
                      fontSize: "0.95rem",
                      py: 1.5,
                      px: 2,
                      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#111",
                      fontSize: "0.95rem",
                      py: 1.5,
                      px: 2,
                    }}
                  >
                    Review
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((review, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        bgcolor: "#f9f9f9",
                        cursor: "pointer",
                      },
                      "&:nth-of-type(even)": {
                        bgcolor: "#fefefe",
                      },
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "0.9rem",
                        color: "#333",
                        py: 1.2,
                        px: 2, // Increased padding
                        borderBottom: "1px solid #e0e0e0",
                        borderRight: "1px solid #e0e0e0", // Vertical separator
                      }}
                    >
                      {review.customerName}
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
                      {review.customerEmail}
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
                      {review.packageName}
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
                      {review.orderId}
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
                      {review.reviewText}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Reviews;