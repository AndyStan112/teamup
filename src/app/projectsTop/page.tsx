"use client";
import * as React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Stack,
    Grid2 as Grid,
    Avatar,
    CardActionArea,
    Chip,
    Skeleton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";
import { getMostLikedProjects, getApprovedSuccessProjects } from "./actions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MuiMarkdown from "mui-markdown";

export interface ProjectWithCreator extends Project {
    originalCreator: {
        name: string;
        profileImage: string;
    };
}

export interface SuccessStoryWithProject {
    id: string;
    content: string;
    createdAt: Date;
    project: ProjectWithCreator;
}

export default function Page() {
    const [projects, setProjects] = React.useState<ProjectWithCreator[]>([]);
    const [successProjects, setSuccessProjects] = React.useState<SuccessStoryWithProject[]>([]);

    const [loading, setLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        async function fetchData() {
            const [liked, success] = await Promise.all([
                getMostLikedProjects(),
                getApprovedSuccessProjects(),
            ]);

            setProjects(liked);
            setSuccessProjects(success);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <Stack alignItems="center" spacing={2} sx={{ mt: 5 }}>
                <Typography gutterBottom variant="h5" component="div" color="white">
                    Projects of the Month
                </Typography>

                <Stack spacing={3}>
                    {[...Array(3)].map((_, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: { xs: "80%", sm: "90%", md: "90%", lg: 600 },
                                borderRadius: 1.5,
                                backgroundColor: "#131d4c",
                            }}
                        >
                            <CardContent sx={{ padding: "8px 16px", minHeight: 60 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Stack>
                                        <Skeleton variant="text" width={120} height={20} />
                                        <Skeleton variant="text" width={180} height={28} />
                                    </Stack>
                                </Stack>
                            </CardContent>

                            <Skeleton variant="rectangular" height={140} width="100%" />

                            <CardContent>
                                <Skeleton variant="text" width="100%" height={40} />
                                <Stack direction="row" spacing={1} mt="5px">
                                    {[...Array(3)].map((_, idx) => (
                                        <Skeleton
                                            key={idx}
                                            variant="rounded"
                                            width={80}
                                            height={30}
                                        />
                                    ))}
                                </Stack>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{ mt: 1 }}
                                >
                                    <Skeleton variant="circular" width={18} height={18} />
                                    <Skeleton variant="text" width={50} height={20} />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Stack>
        );
    }

    return (
        <Stack alignItems="center" spacing={6} sx={{ mt: 5, pb: 8 }}>
            <Typography gutterBottom variant="h5" component="div" color="white">
                Projects of the Month
            </Typography>

            <Stack alignItems="center" spacing={3} width="100%">
                <Typography variant="h6" color="white">
                    Most Liked Projects
                </Typography>

                {projects.length === 0 ? (
                    <Typography variant="h6" color="gray">
                        No projects found for this month.
                    </Typography>
                ) : (
                    projects.map((project) => (
                        <Card
                            key={project.id}
                            sx={{
                                width: { xs: "80%", sm: "90%", md: "90%", lg: 600 },
                                borderRadius: 1.5,
                                backgroundColor: "#131d4c",
                            }}
                        >
                            <CardContent sx={{ padding: "8px 16px", minHeight: 60 }}>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid>
                                        <Avatar
                                            src={
                                                project.originalCreator.profileImage ||
                                                "/images/default-avatar.png"
                                            }
                                            alt={project.originalCreator.name}
                                            sx={{ width: 40, height: 40, cursor: "pointer" }}
                                            onClick={() =>
                                                router.push(`/users/${project.originalCreatorId}`)
                                            }
                                        />
                                    </Grid>
                                    <Grid>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            color="white"
                                            marginTop={0.8}
                                            marginBottom={-1}
                                        >
                                            {project.originalCreator.name}
                                        </Typography>
                                        <Typography variant="h6" component="div" color="white">
                                            {project.title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>

                            {project.images.length > 0 && (
                                <CardActionArea
                                    onClick={() => router.push(`/projects/${project.id}`)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="auto"
                                        sx={{ maxHeight: "45vh" }}
                                        image={project.images[0] || "/images/default-project.png"}
                                        alt="Project Image"
                                    />
                                </CardActionArea>
                            )}

                            <CardContent>
                                <Typography variant="body2" component="div" color="white">
                                    <MuiMarkdown>{project.description}</MuiMarkdown>
                                </Typography>
                                <Stack direction="row" spacing={1} mt="5px">
                                    {project.technologies.map((tech, index) => (
                                        <Chip
                                            key={index}
                                            label={tech}
                                            color="primary"
                                            variant="filled"
                                        />
                                    ))}
                                </Stack>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{ mt: 1 }}
                                >
                                    <ThumbUpIcon sx={{ color: "white", fontSize: 18 }} />
                                    <Typography variant="body2" color="white">
                                        {project.likeCount}{" "}
                                        {project.likeCount === 1 ? "Like" : "Likes"}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Stack>

            <Stack alignItems="center" spacing={2} width="100%">
                <Typography variant="h6" color="white">
                    Success Projects
                </Typography>

                {successProjects.length === 0 ? (
                    <Typography variant="h6" color="gray">
                        No success stories published yet.
                    </Typography>
                ) : (
                    successProjects.map((story) => {
                        const project = story.project;

                        return (
                            <Card
                                key={story.id}
                                sx={{
                                    width: { xs: "80%", sm: "90%", md: "90%", lg: 600 },
                                    borderRadius: 1.5,
                                    backgroundColor: "#131d4c",
                                }}
                            >
                                <CardContent sx={{ padding: "8px 16px", minHeight: 60 }}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid>
                                            <Avatar
                                                src={
                                                    project.originalCreator.profileImage ||
                                                    "/images/default-avatar.png"
                                                }
                                                alt={project.originalCreator.name}
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </Grid>
                                        <Grid>
                                            <Typography
                                                variant="body2"
                                                component="div"
                                                color="white"
                                                marginTop={0.8}
                                                marginBottom={-1}
                                            >
                                                {project.originalCreator.name}
                                            </Typography>
                                            <Typography variant="h6" component="div" color="white">
                                                {project.title}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>

                                <CardContent>
                                    <Typography variant="body2" component="div" color="white">
                                        <MuiMarkdown>{story.content}</MuiMarkdown>
                                    </Typography>
                                    <Stack direction="row" spacing={1} mt="5px">
                                        {project.technologies.map((tech, index) => (
                                            <Chip
                                                key={index}
                                                label={tech}
                                                color="primary"
                                                variant="filled"
                                            />
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </Stack>
        </Stack>
    );
}
