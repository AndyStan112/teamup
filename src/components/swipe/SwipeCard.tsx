"use client";
import "./SwipeCard.css";
import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";

interface SwipeCardProps {
    children: React.ReactNode;
    height?: number | string;
    swiped?: "LEFT" | "RIGHT" | null;
    onSwiped?: (direction: "LEFT" | "RIGHT") => void;
}

const threshold = 200;

const SwipeCard: React.FC<SwipeCardProps> = ({ children, height = "60vh", swiped, onSwiped }) => {
    const [start, setStart] = useState(0);
    const [offset, setOffset] = useState(0);
    const [dismissed, setDismissed] = useState(false);

    const handleDragStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (event.button !== 0) return;
        setStart(event.clientX);
    };

    const handleDragMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (start === 0) return;
        setOffset(event.clientX - start);
    };

    const handleDragEnd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (Math.abs(offset) >= threshold) {
            if (onSwiped) onSwiped(offset > 0 ? "RIGHT" : "LEFT");
            setDismissed(true);
        }
        setStart(0);
        setOffset(0);
    };

    const translateXoffset = swiped ? (swiped === "LEFT" ? "-50vw" : "50vw") : `${offset}px`;

    useEffect(() => {
        if (!swiped) setDismissed(false);
    }, [swiped]);

    return (
        <Box position="relative" sx={{ userSelect: "none" }}>
            <Paper
                style={{
                    transform: dismissed ? "" : "scale(0.85)",
                    opacity: dismissed ? 1 : 0.85,
                }}
                sx={{
                    height,
                    width: "100%",
                    position: "absolute",
                    p: 2,
                    transition: "transform 0.4s",
                    transitionDelay: "0.3s",
                }}
            ></Paper>
            <Paper
                component="div"
                style={{ transform: `translateX(${translateXoffset})` }}
                sx={{
                    height,
                    width: "100%",
                    position: "absolute",
                    p: 2,
                    transition: offset !== 0 || !dismissed ? "" : "transform 0.4s, opacity 0.4s",
                    opacity: swiped ? 0 : 1,
                    // overflowY: "auto",
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
            >
                {children}
            </Paper>
            <Box height={height} />
        </Box>
    );
};

export default SwipeCard;
