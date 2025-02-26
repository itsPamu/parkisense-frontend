import { Box, Card, Typography } from "@mui/material";
import { AlertCircle, CheckCircle } from "lucide-react";
interface TestResultProps {
  result: {
    handwritingPrediction: string;
    handwritingProbability: number;
    voicePrediction: string;
    voiceProbability: number;
    finalPrediction: string;
    finalConfidence: number;
    riskLevel: string;
  };
}

const getSeverity = (riskLevel: string) => {

  if (riskLevel.includes("High Risk")) {
    return {
      severity: "High",
      color: "#e63946", // Red (High Risk)
      backgroundColor: "rgba(230, 57, 70, 0.2)",
      icon: <AlertCircle size={32} color="#e63946" />,
      recommendation:
        "Strong indicators of Parkinson's detected. We highly recommend consulting a doctor for further evaluation.",
    };
  } else if (riskLevel.includes("Moderate Risk")) {
    return {
      severity: "Moderate",
      color: "#f59e0b", // Amber (Moderate Risk)
      backgroundColor: "rgba(255, 193, 7, 0.2)",
      icon: <AlertCircle size={32} color="#f59e0b" />,
      recommendation:
        "There are moderate signs of Parkinson's. Consider lifestyle changes and seek medical advice.",
    };
  } else {
    return {
      severity: "Low",
      color: "#22c55e", // Green (Low Risk)
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      icon: <CheckCircle size={32} color="#22c55e" />,
      recommendation:
        "No significant signs of Parkinson's detected. Maintain a healthy lifestyle.",
    };
  }
};

export default function TestResult({ result }: TestResultProps) {
  const severityInfo = getSeverity(result.riskLevel);
  
  return (
    <Card sx={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)", height: 'auto', padding: 2, marginBottom: 2, backgroundColor: "white", borderRadius: 2 }}>
      <Box display="flex" justifyContent="center" mb={3}>
        <Box
          sx={{
            backgroundColor: severityInfo.backgroundColor,
            borderRadius: "50%",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {severityInfo.icon}
        </Box>
      </Box>
      <Typography variant="h6" fontWeight="bold" color={severityInfo.color} textAlign="center" gutterBottom>
        {severityInfo.severity} Risk of Parkinson's Detected
      </Typography>
      <Typography variant="body2" color="gray" textAlign="center" mb={2}>
        Confidence Level: {(result.finalConfidence * 100).toFixed(2)}%
      </Typography>
      <Box sx={{ backgroundColor: "#f9fafb", borderRadius: 2, p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Recommendations
        </Typography>
        <Typography variant="body2" color="gray">
          {severityInfo.recommendation}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Detailed Analysis
        </Typography>
        <Typography variant="body2" color="gray">
        🖋 Handwriting Prediction: {result.handwritingPrediction} {(result.handwritingProbability * 100).toFixed(0)}% confidence
        </Typography>
        <Typography variant="body2" color="gray">
        🎙 Voice Prediction: {result.voicePrediction} {(result.voiceProbability * 100).toFixed(0)}% confidence
        </Typography>
      </Box>
    </Card>
  );
}