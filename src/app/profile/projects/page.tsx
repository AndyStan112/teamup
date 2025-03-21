"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserProjects, getJoinedCurrentUserProjects } from "./actions";
import {
    Typography,
    Container,
    Stack,
    Fab,
    Skeleton,
    Card,
    CardContent,
    CardMedia,
    Avatar,
} from "@mui/material";
import ProjCard from "@/components/project/ProjCard";
import AddIcon from "@mui/icons-material/Add";

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
    const [joinedProjects, setJoinedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchProjects() {
            const data = await getCurrentUserProjects();
            setProjects(data);
            // setLoading(false);
        }
        fetchProjects();

        async function fetchJoinedProjects() {
            const data = await getJoinedCurrentUserProjects();
            console.log(data);
            setJoinedProjects(data);
            setLoading(false);
        }
        fetchJoinedProjects();
    }, []);

    return (
        <>
            <Container maxWidth="md" sx={{ py: 3, maxWidth: { xs: "500px", lg: "500px" } }}>
                <Stack spacing={3}>
                    <Typography variant="h4" textAlign="center">
                        My Projects
                    </Typography>

                    {loading ? (
                        [...Array(3)].map((_, index) => (
                            <Card
                                key={index}
                                sx={{
                                    maxWidth: 600,
                                    borderRadius: 1.5,
                                    backgroundColor: "#131d4c",
                                }}
                            >
                                <CardContent sx={{ padding: "8px 16px", minHeight: 60 }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Skeleton variant="circular" width={40} height={40} />
                                        <Stack>
                                            <Skeleton variant="text" width="150px" height={20} />
                                            <Skeleton variant="text" width="100px" height={15} />
                                        </Stack>
                                    </Stack>
                                    <Skeleton
                                        variant="text"
                                        width="80%"
                                        height={30}
                                        sx={{ mt: 2 }}
                                    />
                                    <Skeleton variant="text" width="60%" height={20} />
                                </CardContent>

                                <Skeleton variant="rectangular" width="100%" height={140} />

                                <CardContent>
                                    <Skeleton variant="text" width="70%" height={20} />
                                    <Skeleton
                                        variant="text"
                                        width="50%"
                                        height={15}
                                        sx={{ mt: 1 }}
                                    />
                                </CardContent>
                            </Card>
                        ))
                    ) : projects.length === 0 ? (
                        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
                            No projects found.
                        </Typography>
                    ) : (
                        <>
                            {projects.map((project) => (
                                <ProjCard key={project.id} project={project} />
                            ))}
                            <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                                My Joined Projects
                            </Typography>
                            {joinedProjects.map((project, index) => (
                                <ProjCard key={index} project={project} />
                            ))}
                        </>
                    )}
                </Stack>
            </Container>

            <Fab
                color="primary"
                aria-label="add"
                onClick={() => router.push("/profile/projects/add")}
                sx={{
                    position: "fixed",
                    bottom: 30,
                    right: 30,
                    zIndex: 1000,
                }}
            >
                <AddIcon />
            </Fab>
        </>
    );
}
