import { Card, CardContent, Typography, Box } from "@mui/material";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const testHistory = [
  {
    date: "February 20, 2025",
    risk: 92,
    severity: "High",
    warning: true, // High Risk - Red
    color: "#e63946", 
  },
  {
    date: "February 10, 2025",
    risk: 85,
    severity: "High",
    warning: true, // High Risk - Red
    color: "#e63946",
  },
  {
    date: "February 18, 2025",
    risk: 75,
    severity: "Moderate",
    warning: true, // Moderate Risk - Amber
    color: "#f59e0b",
  },
  {
    date: "February 15, 2025",
    risk: 30,
    severity: "Low",
    warning: false, // Low Risk - Green
    color: "#22c55e",
  }
];



export default function TestHistoryCard() {
  return (
    <Card sx={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)", backgroundColor: "white", borderRadius: 2, p: 2 }}>
      <CardContent>
        {/* Header */}
        <Typography fontSize={20} fontWeight="bold" sx={{ color: "#1a1e27", letterSpacing: "0.5px" }}>
          Test History
        </Typography>

        {/* Test History List */}
        <Box sx={{ mt: 2 }}>
          {testHistory.map((test, i) => (
            <Box
              key={i}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                p: 2,
                mb: 2,
                boxShadow: "none",
              }}
            >
              {/* Test Date */}
              <Typography variant="body2" color="gray">
                {test.date}
              </Typography>

              {/* Test Result with Icon */}
              <Box display="flex" alignItems="center" gap={1}>
                {test.warning ? (
                  <AlertCircle size={20} color={test.color} />
                ) : (
                  <CheckCircle2 size={20} color={test.color} />
                )}
                <Typography variant="body2" sx={{ color: test.color }}>
                  {test.warning ? "Possible Signs" : "No Signs"} ({test.risk}% risk)
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
