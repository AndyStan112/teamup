"use client";
import React, { useEffect, useState } from "react";
import { getProjectSwipe, swipeProject } from "./actions";
import { Typography, Avatar, Stack, Button, Chip, Box, CardMedia } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import GitHubIcon from "@mui/icons-material/GitHub";
import SwipeCard from "@/components/swipe/SwipeCard";
import MuiMarkdown from "mui-markdown";

export default function SwipeProjects() {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<any>(null);
    const [swiped, setSwiped] = useState<"LEFT" | "RIGHT" | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            const fetchedProject = await getProjectSwipe();
            console.log(fetchedProject);
            setProject(fetchedProject);
            setLoading(false);
        };
        fetchProject();
    }, []);

    const handleSwiped = async (direction: "LEFT" | "RIGHT") => {
        if (!project) return;

        setSwiped(direction);
        setLoading(true);
        const newProject = await swipeProject(direction, project.id);
        console.log(newProject);
        setProject(newProject);
        setTimeout(() => {
            if (project) {
                setSwiped(null);
                setLoading(false);
            }
        }, 200);
    };

    const buttonsDisabled = Boolean(swiped) || loading || !Boolean(project);

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
                <Box>
                    <Typography variant="h5" textAlign="center">
                        Find projects
                    </Typography>
                </Box>

                <SwipeCard swiped={swiped} onSwiped={handleSwiped} loading={loading}>
                    {project ? (
                        <Stack gap={1} flex={1} sx={{ overflowY: "auto" }}>
                            {project.images.length > 0 && (
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image={project.images[0]}
                                    alt="Project image"
                                    sx={{ objectFit: "cover", maxHeight: "50%" }}
                                />
                            )}
                            <Stack flex={1} p={2} gap={1}>
                                <Typography variant="h6">{project.title}</Typography>

                                <Typography variant="body1">Technologies:</Typography>
                                <Box display="flex" gap={1} flexWrap="wrap">
                                    {project.technologies.map((value: string, key: number) => (
                                        <Chip key={key} label={value} />
                                    ))}
                                </Box>

                                <Typography component="div" flex={1}>
                                    <MuiMarkdown>{project.description}</MuiMarkdown>
                                </Typography>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    color="inherit"
                                    startIcon={<GitHubIcon />}
                                    component="a"
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Github Profile
                                </Button>
                            </Stack>
                        </Stack>
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
