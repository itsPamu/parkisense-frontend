import { Box, Typography } from "@mui/material";
import Profile from "./components/Profile";
import Test from "./components/test";
import TestResult from "./components/testResult";
import TestHistory from "./components/testHistory";

export default function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: "1275px", width: "100%" }}>
        <Box sx={{ paddingTop: 3, textAlign: "center", mb: 3 }}>
          <Typography variant="h4" textAlign="center">
            Discover Better Health with <span style={{ color: "#6CB4EE" }}>ParkiSense</span>
          </Typography>
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          <Box flex={2} display="flex" flexDirection="column" gap={3}>
            <Test />
            <TestResult />
          </Box>
          <Box flex={1} display="flex" flexDirection="column" gap={3}>
            <Profile />
            <TestHistory />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
