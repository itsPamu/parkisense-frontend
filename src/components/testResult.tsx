import { Box, Card, Typography } from "@mui/material";
import { AlertCircle, CheckCircle } from "lucide-react";

const dummyResults = [
  {
    risk: 92,
    severity: "High",
    color: "#e63946", // Red (Highest Risk)
    backgroundColor: "rgba(230, 57, 70, 0.2)",
    icon: <AlertCircle size={32} color="#e63946" />, // Danger sign
    recommendation: "Some indicators suggest potential early signs of Parkinson's. We recommend consulting a doctor for further evaluation.",
    handwritingDetection: { detected: true, probability: 88 },
    voiceDetection: { detected: true, probability: 91 },
    accuracy: "95%"
  },
  {
    risk: 75,
    severity: "Moderate",
    color: "#f59e0b", // Amber (Medium Risk)
    backgroundColor: "rgba(255, 193, 7, 0.2)",
    icon: <AlertCircle size={32} color="#f59e0b" />, // Warning sign
    recommendation: "There are moderate signs of Parkinson's. Consider lifestyle changes and seek medical advice.",
    handwritingDetection: { detected: true, probability: 80 },
    voiceDetection: { detected: false, probability: 45 },
    accuracy: "92%"
  },
  {
    risk: 30,
    severity: "Low",
    color: "#22c55e", // Green (Lowest Risk)
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    icon: <CheckCircle size={32} color="#22c55e" />, // Safe sign
    recommendation: "No significant signs of Parkinson's detected. Maintain a healthy lifestyle.",
    handwritingDetection: { detected: false, probability: 20 },
    voiceDetection: { detected: false, probability: 25 },
    accuracy: "97%"
  }
];

export default function TestResult() {
  const result = dummyResults[0]; // Select the result dynamically (e.g., based on API response)
  
  return (
    <Card sx={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)", height: 'auto', padding: 2, marginBottom: 2, backgroundColor: "white", borderRadius: 2 }}>
      <Box display="flex" justifyContent="center" mb={3}>
        <Box
          sx={{
            backgroundColor: result.backgroundColor,
            borderRadius: "50%",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {result.icon}
        </Box>
      </Box>
      <Typography variant="h6" fontWeight="bold" color={result.color} textAlign="center" gutterBottom>
        {result.severity} Risk of Parkinson's Detected
      </Typography>
      <Typography variant="body2" color="gray" textAlign="center" mb={2}>
        Risk of {result.severity}: {result.risk}%
      </Typography>
      <Box sx={{ backgroundColor: "#f9fafb", borderRadius: 2, p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Recommendations
        </Typography>
        <Typography variant="body2" color="gray">
          {result.recommendation}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Detailed Analysis
        </Typography>
        <Typography variant="body2" color="gray">
          Handwriting Detection: {result.handwritingDetection.detected ? "Detected" : "Not Detected"} (Probability: {result.handwritingDetection.probability}%)
        </Typography>
        <Typography variant="body2" color="gray">
          Voice Detection: {result.voiceDetection.detected ? "Detected" : "Not Detected"} (Probability: {result.voiceDetection.probability}%)
        </Typography>
        <Typography variant="body2" color="gray">
          Model Accuracy: {result.accuracy}
        </Typography>
      </Box>
    </Card>
  );
}