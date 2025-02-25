"use client";
import { useState } from "react";
import { MicIcon, UploadIcon } from "lucide-react";
import { Box, Card, Button, SvgIcon, Typography, CircularProgress } from "@mui/material";

export default function TestPage() {
    const [isTestMode, setIsTestMode] = useState(false);
    const [spiralImage, setSpiralImage] = useState<string | null>(null);
    const [voiceRecording, setVoiceRecording] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ 
        handwritingPrediction: string;
        handwritingProbability: number;
        voicePrediction: string;
        voiceProbability: number;
        finalPrediction: string;
        finalConfidence: number;
    } | null>(null); // Store Result

    
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

    const handleAnalyze = async () => {
        if (!spiralImage || !voiceRecording) {
            alert("Please upload both the spiral image and recorded voice.");
            return;
        }

        setIsLoading(true);
        setResult(null);

        const formData = new FormData();
        const imageFileInput = document.getElementById("spiral-upload") as HTMLInputElement;
        const audioFileInput = document.getElementById("voice-upload") as HTMLInputElement;

        if (imageFileInput?.files?.[0]) {
            formData.append("image", imageFileInput.files[0]);
        }

        if (audioFileInput?.files?.[0]) {
            formData.append("audio", audioFileInput.files[0]);
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("🔍 API Response:", data);

            if (response.ok) {
                setResult({
                    handwritingPrediction: data.hand_prediction,
                    handwritingProbability: data.hand_probability,
                    voicePrediction: data.voice_prediction,
                    voiceProbability: data.voice_probability,
                    finalPrediction: data.final_prediction, 
                    finalConfidence: data.confidence 
                    });
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error sending request:", error);
            alert("Failed to analyze. Please try again.");
        } finally {
            setIsLoading(false);
            setIsTestMode(false);
            setSpiralImage(null);
            setVoiceRecording(null);
        }
    };
    

    return (
        <Card sx={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)", height: 'auto', padding: 4, backgroundColor: "white", borderRadius: 2 }}>
            <Box mb={4}>
                <Typography variant="h6" fontWeight="bold">How To Test</Typography>
                <Typography variant="body2" color="gray">Follow these steps to proceed with the test:</Typography>
                <Box component="ol" sx={{ pl: 2, mt: 1, color: "gray", fontSize: "14px" }}>
                    <li>Get a piece of paper and draw a spiral, then upload it.</li>
                    <li>Voice record yourself for 20 seconds.</li>
                    <li>Click <strong>Test Now</strong> to proceed with the test.</li>
                </Box>
                {result && (
                    <Box mt={4} textAlign="center" sx={{ backgroundColor: "#f0fdfa", padding: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4dc0b5" }}>
                            Prediction: {result.finalPrediction}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                            Confidence: {result.finalConfidence.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold", marginTop: 2 }}>
                            🖋 Handwriting Prediction: {result.handwritingPrediction} {(result.handwritingProbability * 100).toFixed(0)}%
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            🎙 Voice Prediction: {result.voicePrediction} {(result.voiceProbability * 100).toFixed(0)}%
                        </Typography>
                    </Box>
                )}
            </Box>
            <Box sx={{ paddingTop: 2 }}>
                {isLoading ? (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="200px">
                            <CircularProgress size={64} sx={{ color: "#6CB4EE" }} />
                            <Typography variant="h6" sx={{ color: "#6CB4EE", fontWeight: "bold", marginTop: 2 }}>
                                Processing...
                            </Typography>
                        </Box>
                    ) : (
                    !isTestMode ? (
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    height: 64,
                                    px: 6,
                                    borderRadius: "9999px",
                                    backgroundImage: "linear-gradient(to bottom right, #6CB4EE, #4dc0b5)",
                                    fontSize: "1.125rem",
                                    fontWeight: "bold",
                                    color: "white",
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": {
                                        backgroundImage: "linear-gradient(to bottom right, #5a9ed8, #3da89e)",
                                        transform: "scale(1.05)",
                                    },
                                }}
                                onClick={() => setIsTestMode(true)}
                            >
                                Test Now
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" mb={4}>
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" flex={1} mx={1}>
                                    {spiralImage ? (
                                        <img 
                                            src={spiralImage} 
                                            alt="Uploaded Spiral" 
                                            width={128} 
                                            height={128} 
                                            style={{ borderRadius: "10px", marginTop: "10px" }} 
                                        />
                                    ) : (
                                        <SvgIcon viewBox="0 0 100 100" sx={{ width: 128, height: 128, color: "#6CB4EE" }}>
                                            <path d="M50 90a40 40 0 1 1 0-80 40 40 0 0 1 0 80zm0 0V10m0 80c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 40-17.9 40-40 40z" fill="none" stroke="currentColor" strokeWidth="2" />
                                        </SvgIcon>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="spiral-upload"
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="spiral-upload">
                                        <Button variant="contained" fullWidth startIcon={<UploadIcon />} sx={{ mt: 2, borderRadius: 2, backgroundColor: "#6CB4EE" }} component="span">
                                            Upload Spiral Image
                                        </Button>
                                    </label>
                                </Box>
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" justifyContent="flex-end" flex={1} mx={1}>
                                    {voiceRecording ? (
                                    <audio controls style={{ width: "100%", marginTop: "10px" }}>
                                        <source src={voiceRecording} type="audio/wav" />
                                        Your browser does not support the audio element.
                                    </audio>
                                    ) : (
                                        <SvgIcon viewBox="0 0 100 40" sx={{ width: 128, height: 128 }}>
                                            {[...Array(10)].map((_, i) => (
                                                <rect key={i} x={i * 10} y={15 + Math.sin(i) * 10} width="4" height={10 + Math.random() * 10} fill="#6CB4EE" />
                                            ))}
                                        </SvgIcon>
                                    )}
                                    <input
                                        type="file"
                                        accept="audio/wav"
                                        style={{ display: "none" }}
                                        id="voice-upload"
                                        onChange={handleVoiceUpload}
                                    />
                                    <label htmlFor="voice-upload">
                                        <Button variant="contained" fullWidth startIcon={<MicIcon />} sx={{ mt: 2, borderRadius: 2, backgroundColor: "#6CB4EE" }} component="span">
                                            Upload Recorded Voice
                                        </Button>
                                    </label>
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" gap={4} paddingTop={4}>
                                <Button variant="contained" onClick={handleAnalyze} sx={{ borderRadius: 2, backgroundColor: "#4dc0b5" }} disabled={isLoading}>
                                    Analyze
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => {
                                        setIsTestMode(false);
                                        setSpiralImage(null);
                                        setVoiceRecording(null);
                                        }} 
                                        sx={{ borderRadius: 2, borderColor: "#d1d5db", color: "black" }}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    ))}

            </Box>
        </Card>
    );
}
