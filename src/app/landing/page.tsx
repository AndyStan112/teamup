"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Box, Container, useTheme } from "@mui/material";
import SpeechBubble from "@/components/speech-bubble/SpeechBubble";

export default function LandingPage() {
    const theme = useTheme();

    const images = [
        "/images/robot-closed-eyes.svg",
        "/images/robot-open-eyes.svg"
    ];

    const [currentRobotImage, setCurrentRobotImage] = useState(images[0]);
    const transitionDelays = [140, 2000]; 
    const indexRef = useRef(0);

    useEffect(() => {
        const cycleImages = () => {
            indexRef.current = (indexRef.current + 1) % images.length;
            setCurrentRobotImage(images[indexRef.current]);

            setTimeout(cycleImages, transitionDelays[indexRef.current]);
        };

        const timeout = setTimeout(cycleImages, transitionDelays[0]); 

        return () => clearTimeout(timeout); 
    }, []);

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
                

                <Box
                    sx={{
                        width: 250, 
                        height: 250,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.background.paper,
                        position: "absolute",
                        bottom: 10, 
                        zIndex: 0,
                        transform: "translateX(-3px)"
                    }}
                />


                <Box sx={{ position: "relative", zIndex: 1, mt: -12 }}>
                    <Image
                        src={currentRobotImage}
                        alt="Robot Animation"
                        width={350} 
                        height={350}
                        priority
                    />
                </Box>
                

            </Container>
        </Box>
    );
}
