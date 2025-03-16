"use client";
import React from "react";
import { Box, Container, useTheme } from "@mui/material";
import RobotAnimation from "@/components/robot/RobotAnimation";
import SpeechBubble from "@/components/speech-bubble/SpeechBubble";

export default function LandingPage() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "linear-gradient(to right, #ca5a29, #a31755)",
                color: "white",
                textAlign: "center",
                position: "relative",
            }}
        >
            <Container
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* Background Circle */}
                <Box
                    sx={{
                        width: 250,
                        height: 250,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.background.paper,
                        position: "absolute",
                        bottom: 10,
                        zIndex: 0,
                        transform: "translateX(-3px)",
                    }}
                />

                {/* Robot Animation Component */}
                <RobotAnimation />
            </Container>
        </Box>
    );
}
