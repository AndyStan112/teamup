"use client";
import React from "react";
import Image from "next/image";
import { Box, Container, useTheme } from "@mui/material";

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
            <Container sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box
                    sx={{
                        width: 230, 
                        height: 230,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.background.paper,
                        position: "absolute",
                        bottom: +40, 
                        zIndex: 0, 
                    }}
                />


                <Box sx={{ position: "relative", zIndex: 1, mt:-12}}>
                    <Image
                        src="/images/robot.svg"
                        alt="Robot"
                        width={400} 
                        height={400}
                        priority
                    />
                </Box>

            </Container>
        </Box>
    );
}
