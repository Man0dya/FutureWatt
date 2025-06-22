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
  TextField,
  Button,
} from "@mui/material";
import SideBar from "../SideBar/SideBar";
import axios from "axios";

function Contact() {
  const [messages, setMessages] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [showReplyBox, setShowReplyBox] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:6001/Contact/getContacts")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact messages:", error);
        setSnackbarMessage("Failed to load contact messages.");
        setOpenSnackbar(true);
      });
  }, []);

  const handleReplyClick = (messageId) => {
    setShowReplyBox((prev) => ({ ...prev, [messageId]: !prev[messageId] }));
  };

  const handleSendReply = (messageId, customerEmail) => {
    if (replyMessage.trim() === "") {
      setSnackbarMessage("Please write a reply message.");
      setOpenSnackbar(true);
      return;
    }

    axios
      .post("http://localhost:6001/Contact/sendReply", {
        messageId,
        replyMessage,
        customerEmail,
      })
      .then((response) => {
        setSnackbarMessage("Reply sent successfully!");
        setOpenSnackbar(true);
        setShowReplyBox((prev) => ({ ...prev, [messageId]: false }));
        setReplyMessage("");
      })
      .catch((error) => {
        console.error("Error sending reply:", error);
        setSnackbarMessage("Failed to send reply.");
        setOpenSnackbar(true);
      });
  };

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
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
            Contact Us Messages
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
              <TableHead sx={{ bgcolor: "#ffffff" }}>
                <TableRow>
                  <TableCell sx={headerCellStyle}>Name</TableCell>
                  <TableCell sx={headerCellStyle}>Email</TableCell>
                  <TableCell sx={headerCellStyle}>Subject</TableCell>
                  <TableCell sx={headerCellStyle}>Message</TableCell>
                  <TableCell sx={headerCellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {messages.map((msg, index) => (
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
                    <TableCell sx={bodyCellStyle}>{msg.name}</TableCell>
                    <TableCell sx={bodyCellStyle}>{msg.email}</TableCell>
                    <TableCell sx={bodyCellStyle}>{msg.subject}</TableCell>
                    <TableCell sx={bodyCellStyle}>{msg.message}</TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <Button
                        onClick={() => handleReplyClick(msg._id)}
                        variant="outlined"
                        size="small"
                      >
                        Reply
                      </Button>
                      {showReplyBox[msg._id] && (
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            label="Write your reply"
                            variant="outlined"
                          />
                          <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            onClick={() => handleSendReply(msg._id, msg.email)}
                          >
                            Send Reply
                          </Button>
                        </Box>
                      )}
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
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const headerCellStyle = {
  fontWeight: "bold",
  color: "#111",
  fontSize: "0.95rem",
  py: 1.5,
  px: 2,
  borderRight: "1px solid rgba(255, 255, 255, 0.2)",
};

const bodyCellStyle = {
  fontSize: "0.9rem",
  color: "#333",
  py: 1.2,
  px: 2,
  borderBottom: "1px solid #e0e0e0",
  borderRight: "1px solid #e0e0e0",
};

export default Contact;
