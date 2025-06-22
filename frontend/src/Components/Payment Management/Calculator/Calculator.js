import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Paper,
  Slide,
  Grid2,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function Calculator() {
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleCalculator = () => {
    setIsVisible(!isVisible);
  };

  const handleButtonClick = (val) => {
    if (val === "AC") {
      setValue("");
    } else if (val === "DE") {
      setValue(value.slice(0, -1));
    } else if (val === "=") {
      try {
        setValue(eval(value).toString()); // Evaluate expression
      } catch (error) {
        setValue("Error"); // Handle invalid expressions
      }
    } else {
      setValue(value + val); // Append value
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isVisible && (
        <IconButton
          onClick={toggleCalculator}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            bgcolor: "#FF7D29",
            color: "#fff",
            "&:hover": { bgcolor: "#E06C00" },
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 1300,
          }}
        >
          <ExpandLess />
        </IconButton>
      )}

      {/* Calculator Container */}
      <Slide direction="up" in={isVisible} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            right: 20,
            width: { xs: "90%", sm: 320 },
            maxWidth: "400px",
            zIndex: 1300,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              bgcolor: "#fff", // White background
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ p: 2 }}>
              {/* Close Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={toggleCalculator}
                  sx={{ color: "#666" }}
                >
                  <ExpandMore />
                </IconButton>
              </Box>

              {/* Display */}
              <TextField
                value={value}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  sx: {
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#333",
                  },
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f5f5f5",
                    borderRadius: "12px",
                    "& fieldset": { borderColor: "#ddd" },
                    "&:hover fieldset": { borderColor: "#aaa" },
                  },
                }}
              />

              {/* Button Grid */}
              <Grid2 container spacing={1}>
                {/* Row 1 */}
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("AC")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    AC
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("DE")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    DE
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick(".")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    .
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("/")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    /
                  </Button>
                </Grid2>

                {/* Row 2 */}
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("7")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    7
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("8")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    8
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("9")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    9
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("*")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    *
                  </Button>
                </Grid2>

                {/* Row 3 */}
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("4")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    4
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("5")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    5
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("6")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    6
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("-")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    -
                  </Button>
                </Grid2>

                {/* Row 4 */}
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("1")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    1
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("2")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    2
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("3")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    3
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("+")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    +
                  </Button>
                </Grid2>

                {/* Row 5 */}
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("0")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    0
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("00")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    00
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleButtonClick("=")}
                    sx={{
                      bgcolor: "#000", // Black button
                      color: "#fff",
                      "&:hover": { bgcolor: "#333" },
                      borderRadius: "12px", // Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      fontWeight: "bold",
                    }}
                  >
                    =
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </Paper>
        </Box>
      </Slide>
    </>
  );
}

export default Calculator;