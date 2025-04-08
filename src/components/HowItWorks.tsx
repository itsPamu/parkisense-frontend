import { Box, Typography, Paper } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const steps = [
  {
    number: 1,
    title: "Draw a spiral",
    subtitle: "Upload a photo of your spiral drawing",
  },
  {
    number: 2,
    title: "Record voice",
    subtitle: 'Say "aaah" for 5 seconds',
  },
  {
    number: 3,
    title: "Get results",
    subtitle: "Receive instant analysis",
  },
];

interface HowItWorksProps {
  setTestStarted: Dispatch<SetStateAction<boolean>>;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ setTestStarted }) => {
  return (
    <>
      <Typography
        variant="h6"
        textAlign="center"
        fontWeight="bold"
        sx={{ mt: 5, mb: 3, color: "#1E293B" }}
      >
        How it works:
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
        justifyContent="center"
        mb={4}
      >
        {steps.map((step) => (
          <Paper
            key={step.number}
            elevation={0}
            sx={{
              flex: 1,
              px: 3,
              py: 2.5,
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6B7DB3 0%, #4DB8F8 100%)",
                color: "#fff",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.875rem",
              }}
            >
              {step.number}
            </Box>
            <Typography fontWeight="bold" color="#1E293B">
              {step.title}
            </Typography>
            <Typography variant="body2" color="#64748B">
              {step.subtitle}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box textAlign="center" mb={4}>
        <Box
          component="button"
          onClick={() => setTestStarted(true)}
          sx={{
            background: "linear-gradient(135deg, #6B7DB3 0%, #4DB8F8 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "none",
            px: 5,
            py: 1.5,
            borderRadius: "999px",
            boxShadow: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": { opacity: 0.9 },
            outline: "none",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          Start Test
        </Box>
      </Box>
    </>
  );
};

export default HowItWorks;
