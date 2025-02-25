import { Avatar, Box, Card, Typography } from "@mui/material";

export default function Profile() {
    return (
        <Card sx={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)", height: 'auto', padding: 2, backgroundColor: "white", borderRadius: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src="/placeholder.svg" alt="Profile picture" sx={{ width: 80, height: 80 }} />
                    <Box>
                        <Typography variant="h6" fontWeight="bold">John Doe</Typography>
                        <Typography variant="body2" color="gray">Age: 65</Typography>
                    </Box>
                </Box>
                {/* <Box mt={3} display="grid" gap={1}>
                {[
                    { label: "Family History", value: "Yes" },
                    { label: "Smoking", value: "No" },
                    { label: "Exercise Frequency", value: "3 times/week" },
                    { label: "Diet", value: "Mediterranean" },
                ].map((item, index) => (
                    <Box key={index} display="flex" justifyContent="space-between">
                    <Typography fontWeight="medium">{item.label}:</Typography>
                    <Typography color="gray">{item.value}</Typography>
                    </Box>
                ))}
                </Box> */}
        </Card>
    )
}