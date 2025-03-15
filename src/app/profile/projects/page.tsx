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
import ProjCard from "@/components/project/ProjCard";


export type Project = {
    id: string;
    title: string;
    description: string;
    githubLink: string;
    technologies: string[];
    images: string[];
    likeCount: number;
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

   

    if (loading) {
        return (
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                <CircularProgress color="primary" />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5,
            maxWidth: {xs: "500px", lg: "500px"} }}>
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
                    <ProjCard     key={project.id} project={project}/>
                    ))}
                </Stack>
            )}
        </Container>
    );
}
