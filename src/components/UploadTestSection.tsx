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
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: "bold",
                color: "#fff",
                py: 1.2,
                "&:hover": { opacity: 0.9 },
              }}
            >
              {spiralImage ? "Change Spiral" : "Upload Spiral"}
            </Button>
          </label>
        </Paper>

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
            {voiceRecording ? (
              <audio controls src={voiceRecording} style={{ width: "100%" }} />
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
            Record yourself saying "aaah" for 5 seconds
          </Typography>

          <label htmlFor="voice-upload">
            <input
              type="file"
              accept="audio/wav"
              id="voice-upload"
              hidden
              onChange={onVoiceUpload}
            />
            <Button
              component="span"
              fullWidth
              variant="contained"
              startIcon={<MicIcon />}
              disabled={isLoading}
              sx={{
                background: "linear-gradient(135deg, #6B7DB3 0%, #4DB8F8 100%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: "bold",
                color: "#fff",
                py: 1.2,
                "&:hover": { opacity: 0.9 },
              }}
            >
              {voiceRecording ? "Change Recording" : "Record Voice"}
            </Button>
          </label>
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
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: "bold",
            color: "#fff",
            px: 4,
            py: 1,
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
          }}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default UploadTestSection;
