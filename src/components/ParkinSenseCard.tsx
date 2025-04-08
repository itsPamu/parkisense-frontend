import { useState } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import HowItWorks from "./HowItWorks";
import UploadTestSection from "./UploadTestSection";
import Results from "./Results";

const ParkiSenseCard = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState<{
    detected: boolean;
    confidence: number;
    imageProb: number;
    imageDetected: boolean;
    voiceProb: number;
    voiceDetected: boolean;
    updrsScore: number;
    updrsSeverity: "Mild" | "Moderate" | "Severe";
    imageUrl: string | null;
    waveformUrl: string | null;
  }>({
    detected: false,
    confidence: 0,
    imageProb: 0,
    imageDetected: false,
    voiceProb: 0,
    voiceDetected: false,
    updrsScore: 0,
    updrsSeverity: "Mild",
    imageUrl: null,
    waveformUrl: null,
  });

  const [spiralImage, setSpiralImage] = useState<string | null>(null);
  const [voiceRecording, setVoiceRecording] = useState<string | null>(null);

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSpiralImage(URL.createObjectURL(file));
    }
  };

  const handleVoiceUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "audio/wav") {
        setVoiceRecording(URL.createObjectURL(file));
      } else {
        alert("Please upload a valid WAV file.");
      }
    }
  };

  const getUPDRSSeverity = (score: number): "Mild" | "Moderate" | "Severe" => {
    if (score < 20) return "Mild";
    if (score < 40) return "Moderate";
    return "Severe";
  };

  const handleAnalyze = async () => {
    if (!spiralImage || !voiceRecording) {
      alert("Please upload both the spiral image and recorded voice.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    const imageInput = document.getElementById("spiral-upload") as HTMLInputElement;
    const audioInput = document.getElementById("voice-upload") as HTMLInputElement;

    if (imageInput?.files?.[0]) {
      formData.append("image", imageInput.files[0]);
    }

    if (audioInput?.files?.[0]) {
      formData.append("audio", audioInput.files[0]);
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log('dataaaa', data)
      if (response.ok) {
        setResult({
            detected: data.fused_prediction,
            confidence: data.fused_confidence,
            imageProb: data.image_confidence,
            imageDetected: data.image_prediction,
            voiceProb: data.voice_confidence,
            voiceDetected: data.voice_prediction,
            updrsScore: data.severity_score,
            updrsSeverity: getUPDRSSeverity(data.updrs_score),
            imageUrl: spiralImage,
            waveformUrl: voiceRecording,
        });

        setShowResult(true);
        setTestStarted(false);
      } else {
        alert(`Prediction failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        px: { xs: 3, md: 4 },
        pt: 2,
        pb: 3,
        width: "100%",
        maxWidth: "1100px",
        mx: "auto",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#1E293B" }}>
          ParkiSense Test
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {showResult ? (
        <Results
          detected={result.detected}
          confidence={result.confidence}
          imageProb={result.imageProb}
          imageDetected={result.imageDetected}
          voiceProb={result.voiceProb}
          voiceDetected={result.voiceDetected}
          updrsScore={result.updrsScore}
          updrsSeverity={result.updrsSeverity}
          imageUrl={result.imageUrl ?? ""}
          waveformUrl={result.waveformUrl ?? ""}
          onReset={() => {
            setTestStarted(false);
            setShowResult(false);
            setSpiralImage(null);
            setVoiceRecording(null);
            setResult({
              detected: false,
              confidence: 0,
              imageProb: 0,
              imageDetected: false,
              voiceProb: 0,
              voiceDetected: false,
              updrsScore: 0,
              updrsSeverity: "Mild",
              imageUrl: null,
              waveformUrl: null,
            });
          }}
        />
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: "#edf7fa",
              borderRadius: "12px",
              px: 3,
              py: 2,
              mt: 3,
            }}
          >
            <Typography
              sx={{
                color: "#4361b1",
                fontSize: "1rem",
                lineHeight: 1.6,
              }}
            >
              This screening tool analyzes your handwriting and voice patterns to detect potential signs of Parkinson's disease. Early detection can lead to better management and treatment outcomes.
            </Typography>
          </Box>

          {!testStarted ? (
            <HowItWorks setTestStarted={setTestStarted} />
          ) : (
            <UploadTestSection
              onAnalyze={handleAnalyze}
              onCancel={() => setTestStarted(false)}
              onImageUpload={handleImageUpload}
              onVoiceUpload={handleVoiceUpload}
              spiralImage={spiralImage}
              voiceRecording={voiceRecording}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </Paper>
  );
};

export default ParkiSenseCard;
