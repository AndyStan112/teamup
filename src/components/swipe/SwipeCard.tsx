"use client";
import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import SwipeCardSkeleton from "./SwipeCardSkeleton";

interface SwipeCardProps {
    children: React.ReactNode;
    swiped?: "LEFT" | "RIGHT" | null;
    onSwiped?: (direction: "LEFT" | "RIGHT") => void;
    loading?: boolean;
}

const thresholdX = 150;

const SwipeCard: React.FC<SwipeCardProps> = ({ children, swiped, onSwiped, loading = true }) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [dismissed, setDismissed] = useState(false);
    const [underCard, setUnderCard] = useState(false);

    const handleDragStart = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>
    ) => {
        event.preventDefault();
        const clientX =
            event.type === "mousedown"
                ? (event as React.MouseEvent).clientX
                : (event as React.TouchEvent).touches[0].clientX;
        const clientY =
            event.type === "mousedown"
                ? (event as React.MouseEvent).clientY
                : (event as React.TouchEvent).touches[0].clientY;
        setStartX(clientX);
        setStartY(clientY);
    };

    const handleDragMove = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>
    ) => {
        if (startX === 0 && startY === 0) return;
        const clientX =
            event.type === "mousemove"
                ? (event as React.MouseEvent).clientX
                : (event as React.TouchEvent).touches[0].clientX;
        const clientY =
            event.type === "mousemove"
                ? (event as React.MouseEvent).clientY
                : (event as React.TouchEvent).touches[0].clientY;

        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            event.stopPropagation();
            setOffsetX(deltaX);
            setOffsetY(deltaY);
        } else {
            setStartX(0);
            setStartY(0);
        }
    };

    const handleDragEnd = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
        if (Math.abs(offsetX) > Math.abs(offsetY) && Math.abs(offsetX) >= thresholdX) {
            if (onSwiped) onSwiped(offsetX > 0 ? "RIGHT" : "LEFT");
            // setDismissed(true);
            // setUnderCard(true);
        }
        setStartX(0);
        setStartY(0);
        setOffsetX(0);
        setOffsetY(0);
    };

    const translateXoffset = swiped ? (swiped === "LEFT" ? "-50vw" : "50vw") : `${offsetX}px`;
    const shrinkUnderCard = underCard && !loading;

    useEffect(() => {
        setTimeout(() => setUnderCard(!swiped), 300);
        setTimeout(() => setDismissed(!swiped), swiped ? 300 : 0);
    }, [swiped]);

    return (
        <Box position="relative" flex={1} sx={{ userSelect: "none" }}>
            <Paper
                style={{
                    transform: shrinkUnderCard ? "scale(0.85)" : "",
                    opacity: shrinkUnderCard ? 0.85 : 1,
                }}
                sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    transition: "transform 0.4s, opacity 0.4s",
                }}
            >
                <SwipeCardSkeleton />
            </Paper>
            <Paper
                component="div"
                style={{
                    transform: `translateX(${translateXoffset})`,
                    visibility: loading ? "hidden" : "visible",
                }}
                sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    transition:
                        offsetX !== 0 || !dismissed
                            ? ""
                            : "transform 0.4s, opacity 0.4s, visibility 0.4s",
                    opacity: swiped ? 0 : 1,
                    display: "flex",
                    flexDirection: "column",
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {children}
            </Paper>
            <Box height="100%" />
        </Box>
    );
};

export default SwipeCard;
