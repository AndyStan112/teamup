"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Box, useTheme } from "@mui/material";

export default function RobotAnimation() {
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
        <Box sx={{ position: "relative", zIndex: 1, mt: -12 }}>
            <Image
                src={currentRobotImage}
                alt="Robot Animation"
                width={350} 
                height={350}
                priority
            />
        </Box>
    );
}
