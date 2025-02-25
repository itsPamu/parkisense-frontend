import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif", // Change font to Poppins
    h4: { fontSize: "36px", fontWeight: "700" }, // Bolder header
    h6: { fontSize: "24px", fontWeight: "600" }, // Slightly bolder subheading
    body1: { fontSize: "16px", color: "#555", fontWeight: "400" }, // Regular text
    body2: { fontSize: "14px", color: "#777", fontWeight: "400" }, // Secondary text
  },
});

export default theme;
