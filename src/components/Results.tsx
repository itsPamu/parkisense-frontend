import {
    Box,
    Typography,
    Button,
    Paper,
    LinearProgress,
    Tooltip,
  } from "@mui/material";
  import { CheckCircle, AlertCircle, Download, Info } from "lucide-react";
  import recordingIcon from "./recording.png";
  import spiralIcon from "./spiral.png";
  
  type TestResultProps = {
    detected: boolean;
    confidence: number;
    imageProb: number;
    voiceProb: number;
    updrsScore: number;
    updrsSeverity: "Mild" | "Moderate" | "Severe";
    imageUrl: string | null;
    waveformUrl: string | null;
    onReset: () => void;
  };
  
  const Results = ({
    detected,
    confidence,
    imageProb,
    voiceProb,
    updrsScore,
    updrsSeverity,
    imageUrl,
    waveformUrl,
    onReset,
  }: TestResultProps) => {
    const isPositive = detected;
  
    const colors = {
      red: "#E53935",
      green: "#4CAF50",
      redLight: "#FFF5F5",
      greenLight: "#F1FDF4",
      redBar: "#EF5350",
      greenBar: "#8BC34A",
      redIconBg: "#FFCDD2",
      greenIconBg: "#C8E6C9",
    };
  
    const severityColor = {
      Mild: "#8BC34A",
      Moderate: "#FBC02D",
      Severe: "#EF5350",
    };
  
    return (
      <Box mt={4} display="flex" flexDirection="column" gap={3}>
        {/* Summary Card */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "12px",
            px: 3,
            py: 2,
            backgroundColor: isPositive ? colors.redLight : colors.greenLight,
            border: `1px solid ${isPositive ? colors.redBar : colors.greenBar}`,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "999px",
                backgroundColor: isPositive ? colors.redIconBg : colors.greenIconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isPositive ? colors.red : colors.green,
              }}
            >
              {isPositive ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            </Box>
  
            <Box>
              <Typography fontWeight="bold" color={isPositive ? colors.red : colors.green}>
                Parkinson's Disease: {isPositive ? "Detected" : "Not Detected"}
              </Typography>
              <Typography sx={{ color: "#1E293B", fontSize: "0.9rem" }}>
                Overall Confidence: {(confidence * 100).toFixed(2)}%
              </Typography>
            </Box>
          </Box>
  
          <Button
            variant="outlined"
            startIcon={<Download size={16} />}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: "medium",
              px: 3,
            }}
          >
            Export
          </Button>
        </Paper>
  
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: "12px",
              p: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography fontWeight="bold" mb={2}>
              Probability Scores
            </Typography>
  
            <Box mb={2}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  backgroundImage: `url(${spiralIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }}
              />
              <Typography fontSize="0.9rem" color="#334155">
                Image-Based Probability:
              </Typography>
            </Box>
              <LinearProgress
                variant="determinate"
                value={imageProb * 100}
                sx={{
                  height: 10,
                  borderRadius: "5px",
                  backgroundColor: "#f1f5f9",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: isPositive ? colors.redBar : colors.greenBar,
                  },
                }}
              />
              <Typography fontWeight="bold" mt={0.5} color={isPositive ? colors.redBar : colors.greenBar}>
                {(imageProb * 100).toFixed(2)}%
              </Typography>
            </Box>
  
            <Box mb={2}>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    backgroundImage: `url(${recordingIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                />
                <Typography fontSize="0.9rem" color="#334155">
                Voice-Based Probability:
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={voiceProb * 100}
                sx={{
                  height: 10,
                  borderRadius: "5px",
                  backgroundColor: "#f1f5f9",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: isPositive ? colors.redBar : colors.greenBar,
                  },
                }}
              />
              <Typography fontWeight="bold" mt={0.5} color={isPositive ? colors.redBar : colors.greenBar}>
                {(voiceProb * 100).toFixed(2)}%
              </Typography>
            </Box>
  
            {isPositive && (
              <Box mt={3}>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                  <Typography fontWeight="bold">UPDRS Severity Score</Typography>
                  <Tooltip title="Unified Parkinson's Disease Rating Scale (higher = worse)">
                    <Info size={16} color="#94a3b8" />
                  </Tooltip>
                </Box>
  
                <Box display="flex" alignItems="center" gap={2} mt={1}>
                  <Box flex={1} height={8} borderRadius="4px" bgcolor="#e2e8f0" position="relative">
                    <Box
                      sx={{
                        width: `${(updrsScore / 60) * 100}%`,
                        height: "100%",
                        backgroundColor: severityColor[updrsSeverity],
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                  <Typography fontWeight="bold">{updrsScore}</Typography>
                  <Box
                    px={1.5}
                    py={0.5}
                    fontSize="0.75rem"
                    borderRadius="8px"
                    bgcolor={severityColor[updrsSeverity]}
                    color="#fff"
                  >
                    {updrsSeverity}
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
  
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: "12px",
              p: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography fontWeight="bold" mb={2}>
              Input Preview
            </Typography>
  
            <Box display="flex" gap={2}>
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                borderRadius="8px"
                p={1}
                bgcolor="#f1f1f1"
              >
                <Typography variant="caption" sx={{ color: "#64748B", mb: 1 }}>
                  Spiral Drawing
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: 120,
                    backgroundColor: "#f8fafc",
                    backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                  }}
                >
                  {!imageUrl && "Image"}
                </Box>
              </Box>
  
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                borderRadius="8px"
                p={1}
                bgcolor="#f1f1f1"
              >
                <Typography variant="caption" sx={{ color: "#64748B", mb: 1 }}>
                  Voice Recording
                </Typography>

                {waveformUrl ? (
                  <audio
                    controls
                    src={waveformUrl}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      backgroundColor: "#f8fafc",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      backgroundColor: "#f8fafc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      fontSize: "0.9rem",
                      borderRadius: "8px",
                    }}
                  >
                    Waveform
                  </Box>
                )}
              </Box>

            </Box>
          </Paper>
        </Box>
  
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 3,
            borderRadius: "12px",
            backgroundColor: "#e5e7eb",
          }}
        >
          {isPositive ? (
            <>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <AlertCircle color={colors.red} size={20} />
                <Typography fontWeight="bold" fontSize="1.1rem">
                  Recommendations
                </Typography>
              </Box>
              <Typography fontSize="0.95rem" color="#1E293B" mb={1}>
                Based on your test results, we recommend the following next steps:
              </Typography>
              <ul style={{ paddingLeft: "1.2rem", color: "#1E293B", fontSize: "0.9rem" }}>
                <li>Schedule an appointment with a neurologist</li>
                <li>Bring a copy of these results to your appointment</li>
                <li>Follow up regularly to monitor changes</li>
                <li>Learn about early intervention options</li>
              </ul>
              <Typography fontSize="0.8rem" color="#64748B" mt={2}>
                Remember: This tool provides an initial assessment but not a definitive diagnosis.
              </Typography>
            </>
          ) : (
            <>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <CheckCircle color={colors.green} size={20} />
                <Typography fontWeight="bold" fontSize="1.1rem">
                  Healthy Results
                </Typography>
              </Box>
              <Typography fontSize="0.95rem" color="#1E293B" mb={1}>
                Your test results do not indicate signs of Parkinson’s disease.
              </Typography>
              <Typography fontSize="0.9rem" color="#1E293B" mt={1}>
                <strong>What this means:</strong> Your results are within normal range.
              </Typography>
              <Typography fontSize="0.9rem" color="#1E293B">
                <strong>Next steps:</strong> Continue regular check-ups and consider screenings if you have a family history.
              </Typography>
            </>
          )}
        </Paper>
  
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            onClick={onReset}
            sx={{
              background: "linear-gradient(135deg, #6B7DB3 0%, #4DB8F8 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: "bold",
              color: "#fff",
              px: 5,
              py: 1.5,
              "&:hover": { opacity: 0.9 },
            }}
          >
            Take Another Test
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default Results;
  