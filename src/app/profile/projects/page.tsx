"use client";
import { useEffect, useState } from "react";
import { getCurrentUserProjects, likeProject } from "./actions";
import {
    Card,
    CardContent,
    Typography,
    Container,
    CircularProgress,
    Button,
    Stack,
    Chip,
    CardMedia,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

type Project = {
    id: string;
    title: string;
    description: string;
    githubLink: string;
    technologies: string[];
    images: string[];
    likes: number;
};

export default function Page() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            const data = await getCurrentUserProjects();
            setProjects(data);
            setLoading(false);
        }
        fetchProjects();
    }, []);

    const handleLike = async (projectId: string) => {
        await likeProject(projectId);
        setProjects((prev) =>
            prev.map((proj) => (proj.id === projectId ? { ...proj, likes: proj.likes + 1 } : proj))
        );
    };

    if (loading) {
        return (
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress color="primary" />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                My Projects
            </Typography>

            {projects.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
                    No projects found.
                </Typography>
            ) : (
                <Stack spacing={3}>
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            sx={{ backgroundColor: "#131d4c", color: "white", borderRadius: 2 }}
                        >
                            {project.images.length > 0 && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={project.images[0]}
                                    alt="Project image"
                                    sx={{ objectFit: "cover" }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6">{project.title}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {project.description}
                                </Typography>

                                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                    {project.technologies.map((tech, index) => (
                                        <Chip
                                            key={index}
                                            label={tech}
                                            sx={{ bgcolor: "primary.main", color: "white" }}
                                        />
                                    ))}
                                </Stack>

                                <Typography sx={{ mt: 2, color: "lightblue", cursor: "pointer" }}>
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub Link
                                    </a>
                                </Typography>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ mt: 3 }}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<ThumbUpOffAltIcon />}
                                        onClick={() => handleLike(project.id)}
                                    >
                                        Like ({project.likes})
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Container>
    );
}
