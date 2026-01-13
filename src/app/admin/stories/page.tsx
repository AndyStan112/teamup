"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    Chip,
    Avatar,
    CircularProgress,
    Alert,
    Divider,
    Stack,
} from "@mui/material";
import { CheckCircle, Cancel, OpenInNew } from "@mui/icons-material";
import Link from "next/link";

interface User {
    id: string;
    name: string;
    profileImage: string | null;
}

interface Project {
    id: string;
    title: string;
    description: string;
    originalCreator: User;
}

interface SuccessStory {
    id: string;
    content: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    projectid: string;
    project: Project;
}

export default function AdminSuccessStoriesPage() {
    const [stories, setStories] = useState<SuccessStory[]>([]);
    const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/admin/stories");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch success stories");
            }

            setStories(data.stories);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch success stories");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
        if (!selectedStory) return;

        setUpdating(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`/api/admin/stories/${selectedStory.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update success story");
            }

            setSuccess(`Success story ${status.toLowerCase()} successfully`);
            setStories((prev) => prev.map((s) => (s.id === selectedStory.id ? data.story : s)));
            setSelectedStory(data.story);

            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update success story");
        } finally {
            setUpdating(false);
        }
    };

    const getStatusColor = (status: SuccessStory["status"]) => {
        switch (status) {
            case "PENDING":
                return "warning";
            case "APPROVED":
                return "success";
            case "REJECTED":
                return "error";
            default:
                return "default";
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", height: "calc(100vh - 64px)", p: 3, gap: 2 }}>
            {/* Left Column - Stories List */}
            <Paper sx={{ width: "400px", overflow: "auto" }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                    <Typography variant="h5" fontWeight="bold">
                        Success Stories
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {stories.length} total stories
                    </Typography>
                </Box>
                <List>
                    {stories.map((story) => (
                        <ListItem key={story.id} disablePadding>
                            <ListItemButton
                                selected={selectedStory?.id === story.id}
                                onClick={() => {
                                    setSelectedStory(story);
                                    setError("");
                                    setSuccess("");
                                }}
                            >
                                <ListItemText
                                    slotProps={{
                                        primary: { component: "div" },
                                        secondary: { component: "div" },
                                    }}
                                    primary={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography component="span" variant="body1" noWrap>
                                                {story.project.title}
                                            </Typography>
                                            <Chip
                                                label={story.status}
                                                size="small"
                                                color={getStatusColor(story.status)}
                                            />
                                        </Box>
                                    }
                                    secondary={
                                        <Stack spacing={0.5}>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.secondary"
                                                noWrap
                                            >
                                                {story.content.substring(0, 50)}...
                                            </Typography>
                                            <Typography
                                                component="span"
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {new Date(story.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Stack>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Right Column - Story Details */}
            <Paper sx={{ flex: 1, overflow: "auto", p: 3 }}>
                {selectedStory ? (
                    <Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Success Story Details
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {success}
                            </Alert>
                        )}

                        <Stack spacing={3}>
                            {/* Status */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Status
                                </Typography>
                                <Chip
                                    label={selectedStory.status}
                                    color={getStatusColor(selectedStory.status)}
                                    sx={{ mt: 1 }}
                                />
                            </Box>

                            <Divider />

                            {/* Project Info */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Project
                                </Typography>
                                <Link
                                    href={`/projects/${selectedStory.projectid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            mt: 1,
                                            "&:hover": { textDecoration: "underline" },
                                        }}
                                    >
                                        <Typography variant="h6" color="primary">
                                            {selectedStory.project.title}
                                        </Typography>
                                        <OpenInNew fontSize="small" color="primary" />
                                    </Box>
                                </Link>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {selectedStory.project.description}
                                </Typography>
                            </Box>

                            {/* Creator */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Project Creator
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                                    <Avatar
                                        src={
                                            selectedStory.project.originalCreator.profileImage || ""
                                        }
                                        alt={selectedStory.project.originalCreator.name}
                                    />
                                    <Link
                                        href={`/users/${selectedStory.project.originalCreator.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                                "&:hover": { textDecoration: "underline" },
                                            }}
                                        >
                                            <Typography variant="body1" color="primary">
                                                {selectedStory.project.originalCreator.name}
                                            </Typography>
                                            <OpenInNew fontSize="small" color="primary" />
                                        </Box>
                                    </Link>
                                </Box>
                            </Box>

                            <Divider />

                            {/* Story Content */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Success Story
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
                                    {selectedStory.content}
                                </Typography>
                            </Box>

                            <Divider />

                            {/* Created At */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Submitted At
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {new Date(selectedStory.createdAt).toLocaleString()}
                                </Typography>
                            </Box>

                            {/* Action Buttons */}
                            {selectedStory.status === "PENDING" && (
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={<CheckCircle />}
                                        onClick={() => handleStatusUpdate("APPROVED")}
                                        disabled={updating}
                                        fullWidth
                                    >
                                        {updating ? "Updating..." : "Approve"}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<Cancel />}
                                        onClick={() => handleStatusUpdate("REJECTED")}
                                        disabled={updating}
                                        fullWidth
                                    >
                                        {updating ? "Updating..." : "Reject"}
                                    </Button>
                                </Box>
                            )}
                        </Stack>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Select a success story to view details
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
