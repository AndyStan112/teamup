"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { getCurrentUserProjects } from "./actions";
import {
    Typography,
    Container,
    CircularProgress,
    Stack,
    Fab,
} from "@mui/material";
import ProjCard from "@/components/project/ProjCard";
import AddIcon from '@mui/icons-material/Add';

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
    const router = useRouter(); 

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
        <>
            <Container maxWidth="md" sx={{ mt: 5, maxWidth: { xs: "500px", lg: "500px" } }}>
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
                            <ProjCard key={project.id} project={project} />
                        ))}
                    </Stack>
                )}
            </Container>


            <Fab
                color="primary"
                aria-label="add"
                onClick={() => router.push("/profile/projects/add")}
                sx={{
                    position: "fixed",
                    bottom: 30,
                    right: 30,
                    zIndex: 1000
                }}
            >
                <AddIcon />
            </Fab>
        </>
    );
}
