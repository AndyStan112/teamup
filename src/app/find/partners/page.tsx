"use client";
import React, { useEffect, useState } from "react";
import { Typography, Avatar, Stack, Button, Chip, Box } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { getUserSwipe, swipeUser } from "./actions";
import GitHubIcon from "@mui/icons-material/GitHub";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SwipeCard from "@/components/swipe/SwipeCard";

const genderMapping: { [key: string]: string } = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
    DONOTWANTTOSAY: "",
};

export default function SwipePartners() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [swiped, setSwiped] = useState<"LEFT" | "RIGHT" | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUserSwipe();
            console.log(fetchedUser);
            setUser(fetchedUser);
            setLoading(false);
        };
        fetchUser();
    }, []);

    const handleSwiped = async (direction: "LEFT" | "RIGHT") => {
        if (!user) return;

        setSwiped(direction);
        setLoading(true);
        const newUser = await swipeUser(direction, user.id);
        console.log(newUser);
        setUser(newUser);
        setTimeout(() => {
            if (user) {
                setSwiped(null);
                setLoading(false);
            }
        }, 200);
    };

    const buttonsDisabled = Boolean(swiped) || loading || !Boolean(user);

    return (
        <Stack alignItems="center" flex={1} sx={{ overflowX: "hidden" }}>
            <Stack
                width={{ xs: "100%", sm: "50%" }}
                minWidth={{ sm: 450 }}
                maxWidth={{ xs: 450, sm: 550 }}
                gap={3}
                px={2}
                py={3}
                flex={1}
            >
                <Box height={80}>
                    <Typography variant="h5" textAlign="center">
                        Find partners
                    </Typography>
                </Box>

                <SwipeCard swiped={swiped} onSwiped={handleSwiped} loading={loading}>
                    {user ? (
                        <>
                            <Stack alignItems="center">
                                <Avatar
                                    src={user.profileImage}
                                    alt="Profile picture"
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        position: "absolute",
                                        top: "-60px",
                                    }}
                                />
                            </Stack>
                            <Stack gap={1} flex={1} p={2} pt="70px" sx={{ overflowY: "auto" }}>
                                <Typography variant="h5" textAlign="center">
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" textAlign="center">
                                    {[user.age, genderMapping[user.gender]].join(", ")}
                                </Typography>

                                <Typography variant="body1">Languages:</Typography>
                                <Box display="flex" gap={0.8} flexWrap="wrap">
                                    {user.languages.map((value: string, key: number) => (
                                        <Chip key={key} label={value} />
                                    ))}
                                </Box>
                                <Typography variant="body1">Technologies:</Typography>
                                <Box display="flex" gap={0.8} flexWrap="wrap">
                                    {user.technologies.map((value: string, key: number) => (
                                        <Chip key={key} label={value} />
                                    ))}
                                </Box>
                                <Typography variant="body1">Work Timing:</Typography>
                                <Box display="flex" gap={0.8} flexWrap="wrap">
                                    {user.codingTimePreference.map((value: string, key: number) => (
                                        <Chip key={key} label={value} />
                                    ))}
                                </Box>

                                <Typography flex={1}>{user.description}</Typography>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    color="inherit"
                                    startIcon={<GitHubIcon />}
                                    component="a"
                                    href={user.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Github Profile
                                </Button>
                            </Stack>
                        </>
                    ) : (
                        <Stack flex={1} alignItems="center" justifyContent="center" gap={1}>
                            <Typography variant="h2" fontWeight="100">
                                <SentimentSatisfiedAltIcon fontSize="inherit" />
                            </Typography>
                            <Typography variant="h5">List is empty</Typography>
                            <Typography variant="body1">You found all that was to find.</Typography>
                        </Stack>
                    )}
                </SwipeCard>

                <Stack direction="row" justifyContent="space-evenly">
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{ minWidth: 150 }}
                        disabled={buttonsDisabled}
                        startIcon={<ThumbDownOffAltIcon />}
                        onClick={() => handleSwiped("LEFT")}
                    >
                        Dislike
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ minWidth: 150 }}
                        disabled={buttonsDisabled}
                        endIcon={<ThumbUpOffAltIcon />}
                        onClick={() => handleSwiped("RIGHT")}
                    >
                        Like
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
