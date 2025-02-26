import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface TestHistoryProps {
  testHistory: any[];
}

export default function TestHistoryCard({ testHistory }: TestHistoryProps) {

  return (
    <Card
      sx={{
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)",
        backgroundColor: "white",
        borderRadius: 2,
        p: 2,
      }}
    >
      <CardContent>
        {/* Header */}
        <Typography
          fontSize={20}
          fontWeight="bold"
          sx={{ color: "#1a1e27", letterSpacing: "0.5px" }}
        >
          Test History
        </Typography>

        {/* Test History List */}
        <Box sx={{ mt: 2 }}>
          {testHistory.length === 0 ? (
            <Typography variant="body2" color="gray">
              No test history available.
            </Typography>
          ) : (
            testHistory.map((test, i) => (
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
                    {test.warning ? "Possible Signs" : "No Signs"} ({test.risk}%
                    risk)
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
