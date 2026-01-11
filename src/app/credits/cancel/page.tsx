import { Typography, Stack } from "@mui/material";

export default function Success() {
    return (
        <Stack p={4} alignItems="center" gap={2}>
            <Typography variant="h5">Payment canceled </Typography>
            <Typography>Your credits were not added to your account.</Typography>
        </Stack>
    );
}
