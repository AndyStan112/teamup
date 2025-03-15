"use client";
import React, { useEffect, useState } from "react";
import { Typography, Avatar, Stack, Button, Chip, Box } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { getUserSwipe, swipeUser } from "./actions";
import GitHubIcon from "@mui/icons-material/GitHub";
import SwipeCard from "@/components/swipe/SwipeCard";

const genderMapping: { [key: string]: string } = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
    DONOTWANTTOSAY: "",
};

export default function SwipePartners() {
    const [user, setUser] = useState<any>(null);
    const [swiped, setSwiped] = useState<"LEFT" | "RIGHT" | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUserSwipe();
            console.log(fetchedUser);
            setUser(fetchedUser);
        };
        fetchUser();
    }, []);

    const handleSwiped = (direction: "LEFT" | "RIGHT") => {
        setSwiped(direction);
    };

    useEffect(() => {
        if (swiped) setTimeout(() => setSwiped(null), 1000);
    }, [swiped]);

    if (!user) {
        return (
            <Typography variant="h6" color="white">
                Loading...
            </Typography>
        );
    }

    return (
        <Stack alignItems="center" flex={1} sx={{ overflowX: "hidden" }}>
            <Stack
                width={{ xs: "100%", sm: "50%" }}
                minWidth={{ sm: 450 }}
                maxWidth={{ xs: 450, sm: "unset" }}
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

                <SwipeCard swiped={swiped} onSwiped={handleSwiped}>
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
                            {user.age + ", " + genderMapping[user.gender]}
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
                </SwipeCard>

                <Stack direction="row" justifyContent="space-evenly">
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{ minWidth: 150 }}
                        startIcon={<ThumbDownOffAltIcon />}
                        onClick={() => setSwiped("LEFT")}
                    >
                        Dislike
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ minWidth: 150 }}
                        endIcon={<ThumbUpOffAltIcon />}
                        onClick={() => setSwiped("RIGHT")}
                    >
                        Like
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
