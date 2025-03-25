import { Box, Typography } from "@mui/material";
import ParkiSenseCard from "./components/ParkinSenseCard";

export default function App() {  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(to bottom, #C4E1E8 0%, #C4C4E8 50%, #ffffff 100%)",
        py: 5,
        overflowX: "hidden",
      }}
    >
      <Box sx={{ maxWidth: "1275px", width: "100%", px: 2 }}>      
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#1E293B",
            }}
          >
          Discover Better Health with{" "}
            <Box
              component="span"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #6B7DB3 0%, #4DB8F8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "pulse-subtle 3s ease-in-out infinite",
                display: "inline-block",
              }}
            >
              ParkiSense
            </Box>
          </Typography>
        </Box>
        <Box>
        <ParkiSenseCard />
        </Box>
      </Box>
    </Box>
  );
}
