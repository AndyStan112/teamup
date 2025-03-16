"use client";
import React from "react";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import RobotAnimation from "@/components/robot/RobotAnimation";

export default function LandingPage() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: {xs: "calc(100vh - 56px)", md: "calc(100vh - 64px)"},
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "linear-gradient(to right, #ca5a29, #a31755)",
                color: "white",
                position: "relative",
                px: 3,
            }}
        >
            <Container maxWidth="md">
                <Stack
                    spacing={5}
                    alignItems="center"
                    direction={{ xs: "column-reverse", sm: "column-reverse", md: "row", lg: "row" }}
                >
                    <Stack gap={2}>
                        <Typography variant="h4" fontWeight="bold" textAlign="center">
                            Welcome to TeamUp!
                        </Typography>
                        <Typography variant="h6" fontWeight="normal" lineHeight={1.6}>
                            Find partners, discover new projects, and generate ideas
                            with like-minded developers. Join the future of collaborative
                            innovation.
                        </Typography>
                    </Stack>

                    <RobotAnimation />
                </Stack>
            </Container>
        </Box>
    );
}