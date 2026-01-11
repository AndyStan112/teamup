"use client";

import {
    Button,
    Stack,
    Card,
    CardContent,
    Typography,
    useTheme,
    Box,
} from "@mui/material";
import { createCheckoutSession } from "../action";

export default function BuyCredits() {
    const theme = useTheme();

    const buy = async (credits: number) => {
        const url = await createCheckoutSession(credits);
        window.location.href = url!;
    };

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
        >
            <Card
                sx={{
                    width: { xs: "90%", sm: 420 },
                    backgroundColor: "#",
                    borderRadius: 4,
                }}
            >
                <CardContent>
                    <Stack spacing={3}>
                        <Typography variant="h5" color="white" textAlign="center">
                            Buy Credits
                        </Typography>

                        <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.8)"
                            textAlign="center"
                        >
                            Credits are used to unlock premium actions in the platform.
                        </Typography>

                        <Stack spacing={2}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => buy(1)}
                            >
                                Buy 1 credit — 3 RON
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => buy(5)}
                            >
                                Buy 5 credits — 5 RON
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => buy(10)}
                            >
                                Buy 10 credits — 10 RON
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
