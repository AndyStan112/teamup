"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSpecificUser } from "./actions";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Stack,
    Typography,
    Card,
    Grid2 as Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ProjCard from "@/components/project/ProjCard";

const genderMapping: { [key: string]: string } = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
    DONOTWANTTOSAY: "",
};

export default function Page() {
    const params = useParams();
    const userId = params?.userId as string;
    const [user, setUser] = useState<any>();

    useEffect(() => {
        getSpecificUser(userId).then((user) => {
            setUser(user);
        });
    }, [userId]);

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Card sx={{ p: 4, borderRadius: 2 }}>
                <Stack spacing={2} alignItems="center">
                    <Avatar
                        src={user?.profileImage}
                        alt={user?.name}
                        sx={{ width: 100, height: 100 }}
                    />

                    <Stack>
                        <Typography variant="h4" fontWeight="bold" textAlign="center">
                            {user?.name}
                        </Typography>
                        <Typography variant="body2" textAlign="center">
                            {[user.age, genderMapping[user.gender]].join(", ")}
                        </Typography>
                    </Stack>

                    <Button
                        variant="outlined"
                        startIcon={<GitHubIcon />}
                        component="a"
                        color="inherit"
                        href={user?.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub Profile
                    </Button>

                    <Typography variant="body1" color="text.secondary">
                        From: {user?.city}, {user?.country}
                    </Typography>

                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                        {user?.description}
                    </Typography>

                    <Box>
                        <Typography variant="h6" fontWeight="bold" mb={1} textAlign="center">
                            Technologies:
                        </Typography>
                        <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center">
                            {user?.technologies?.map((tech, index) => (
                                <Chip key={index} label={tech} />
                            ))}
                        </Stack>
                    </Box>
                </Stack>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
                        Created Projects
                    </Typography>

                    {user?.createdProjects?.length > 0 ? (
                        <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                            {user.createdProjects.map((project, index) => (
                                <Grid key={index} size={1}>
                                    <ProjCard project={project} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography textAlign="center" color="text.secondary">
                            No projects available.
                        </Typography>
                    )}
                </Box>
            </Card>
        </Container>
    );
}
