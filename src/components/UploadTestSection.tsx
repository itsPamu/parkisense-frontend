import React, { useRef, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { UploadIcon, MicIcon } from "lucide-react";
import { LoadingButton } from "@mui/lab";
import spiralIcon from "./spiral.png";
import recordingIcon from "./recording.png";

interface UploadTestSectionProps {
  onAnalyze: () => void;
  onCancel: () => void;
  onImageUpload: React.ChangeEventHandler<HTMLInputElement>;
  onVoiceUpload: React.ChangeEventHandler<HTMLInputElement>;
  spiralImage: string | null;
  voiceRecording: string | null;
  isLoading: boolean;
}

const UploadTestSection = ({
  onAnalyze,
  onCancel,
  onImageUpload,
  onVoiceUpload,
  spiralImage,
  voiceRecording,
  isLoading,
}: UploadTestSectionProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "record">("record");
  const [countdown, setCountdown] = useState<number | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);

        const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });
        const fakeEvent = {
          target: {
            files: [file],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onVoiceUpload(fakeEvent);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setCountdown(5);

      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev && prev > 1) return prev - 1;
          handleStopRecording();
          return null;
        });
      }, 1000);
    } catch (err) {
      console.error("Microphone error", err);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(null);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={3}
        justifyContent="center"
        mt={2}
        mb={4}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 3,
            textAlign: "center",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              backgroundImage: `url(${spiralImage ?? spiralIcon})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              borderRadius: "8px",
            }}
          />
          <Typography fontWeight="bold" color="#1E293B" mb={1}>
            Spiral Drawing Test
          </Typography>
          <Typography variant="body2" color="#64748B" mb={3}>
            Draw a spiral on paper and upload a photo
          </Typography>

          <label htmlFor="spiral-upload">
            <input
              type="file"
              accept="image/*"
              id="spiral-upload"
              hidden
              onChange={onImageUpload}
            />
            <Button
              component="span"
              fullWidth
              variant="contained"
              startIcon={<UploadIcon />}
              disabled={isLoading}
              sx={{
                background: "linear-gradient(135deg, #6B7DB3 0%, #4DB8F8 100%)",
                boxShadow: "none",
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: "bold",
                color: "#fff",
                py: 1.2,
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
              {spiralImage ? "Change Spiral" : "Upload Spiral"}
            </Button>
          </label>
        </Paper>
        {/* Voice Recording Section */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 3,
            textAlign: "center",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            {recordedAudio || voiceRecording ? (
              <audio
                controls
                src={recordedAudio ?? voiceRecording ?? undefined}
                style={{ width: "100%" }}
              />
            ) : (
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  backgroundImage: `url(${recordingIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  borderRadius: "8px",
                }}
              />
            )}
          </Box>

          <Typography fontWeight="bold" color="#1E293B" mb={1}>
            Voice Recording Test
          </Typography>
          <Typography variant="body2" color="#64748B" mb={3}>
            Record yourself saying "aaah" for 5 seconds or upload a WAV file
          </Typography>

          {mode === "record" ? (
            <>
              <Button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                fullWidth
                variant="contained"
                startIcon={<MicIcon />}
                disabled={isLoading}
                sx={{
                  background: isRecording
                    ? "linear-gradient(135deg, #F87171 0%, #EF4444 100%)"
                    : "linear-gradient(135deg, #6B7DB3 0%, #4DB8F8 100%)",
                  boxShadow: "none",
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#fff",
                  py: 1.2,
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
                {isRecording
                  ? `Stop Recording${countdown !== null ? ` (${countdown})` : ""}`
                  : "Start Recording"}
              </Button>
            </>
          ) : (
            <label htmlFor="voice-upload">
              <input
                type="file"
                accept="audio/wav"
                id="voice-upload"
                hidden
                onChange={(e) => {
                  setRecordedAudio(null);
                  onVoiceUpload(e);
                }}
              />
              <Button
                component="span"
                fullWidth
                variant="outlined"
                startIcon={<UploadIcon />}
                disabled={isLoading}
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: "medium",
                  px: 4,
                  py: 1,
                  color: "#6B7DB3",
                  borderColor: "#6B7DB3",
                  outline: "none",
                  boxShadow: "none",
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
                {voiceRecording ? "Change File" : "Upload Voice"}
              </Button>
            </label>
          )}

          <Button
            variant="text"
            onClick={() => {
              setMode((prev) => (prev === "record" ? "upload" : "record"));
              setRecordedAudio(null);
            }}
            disabled={isRecording}
            sx={{
              fontSize: "0.85rem",
              textTransform: "none",
              color: "#6B7DB3",
              mt: 1,
              outline: "none",
              boxShadow: "none",
              border: "none",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
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
            {mode === "record"
              ? "Prefer to upload instead?"
              : "Prefer to record instead?"}
          </Button>
        </Paper>
      </Box>

      <Box display="flex" justifyContent="center" gap={2}>
        <LoadingButton
          variant="contained"
          onClick={onAnalyze}
          loading={isLoading}
          disabled={isLoading}
          sx={{
            background: "linear-gradient(135deg, #6B7DB3 0%, #4DB8F8 100%)",
            boxShadow: "none",
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: "bold",
            color: "#fff",
            px: 4,
            py: 1,
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
          Analyze Results
        </LoadingButton>

        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isLoading}
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: "medium",
            px: 4,
            py: 1,
            color: "#6B7DB3",
            borderColor: "#6B7DB3",
            outline: "none",
            boxShadow: "none",
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
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default UploadTestSection;