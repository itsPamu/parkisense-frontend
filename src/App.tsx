import { Box, Typography } from "@mui/material";
import Test from "./components/test";
import TestResult from "./components/testResult";
import TestHistory from "./components/testHistory";
import Profile from "./components/profile";
import { useEffect, useState } from "react";

export default function App() {
  const [testHistory, setTestHistory] = useState<any[]>([]);
  const [testResult, setTestResult] = useState<{
    handwritingPrediction: string;
    handwritingProbability: number;
    voicePrediction: string;
    voiceProbability: number;
    finalPrediction: string;
    finalConfidence: number;
    riskLevel: string;
  } | null>(null);


    // Function to fetch history from backend
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/history");
        const data = await response.json();
  
        // Sort data by timestamp (newest first)
        const sortedData = data.sort(
          (a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ).map((test: any) => ({
          date: new Date(test.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          risk: Math.round(test.confidence * 100), // Convert confidence to percentage
          severity: test.risk_level,
          warning: test.risk_level.includes("High") || test.risk_level.includes("Moderate"),
          color: test.risk_level.includes("High") ? "#e63946" : test.risk_level.includes("Moderate") ? "#f59e0b" : "#22c55e",
        }));
  
        setTestHistory(sortedData);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    useEffect(() => {
      fetchHistory(); // Fetch history when component mounts
    }, []);
  
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
            <Test setTestResult={setTestResult} fetchHistory={fetchHistory} />
            {testResult && <TestResult result={testResult} />}
          </Box>
          <Box flex={1} display="flex" flexDirection="column" gap={3}>
            <Profile />
            <TestHistory testHistory={testHistory} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
