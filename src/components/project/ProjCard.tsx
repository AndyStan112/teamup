"use client";
import React from "react";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Project } from "@/app/profile/projects/page";
import { likeProject, checkIfUserLiked } from "@/app/profile/projects/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
export default function ProjCard({ project }: { project: Project }): React.ReactElement {
    const router = useRouter();
    const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(false);

    const { user } = useUser();

    React.useEffect(() => {
        const checkIfLiked = async () => {
            const isLiked = await checkIfUserLiked(project.id);
            setIsButtonDisabled(isLiked);
        };

        checkIfLiked();
    }, [project.id]);

    const handleLike = async (projectId: string) => {
        await likeProject(projectId);
        setIsButtonDisabled(true);
    };

    const gotoProject = () => {
        if (project.id) router.push(`/projects/${project.id}`);
    };

    const myOwnProject = user?.id === project.originalCreatorId;

    return (
        <Card sx={{ backgroundColor: "#131d4c", color: "white", borderRadius: 2, flex: 1 }}>
            {project.images.length > 0 && (
                <CardActionArea onClick={gotoProject}>
                    <CardMedia
                        component="img"
                        image={project.images[0]}
                        alt="Project image"
                        sx={{ objectFit: "cover", maxHeight: "45vh" }}
                    />
                </CardActionArea>
            )}
            <CardContent sx={{ p: 1.8, pb: "16px !important" }}>
                <Stack gap={1}>
                    <Box>
                        <Typography variant="h6">{project.title}</Typography>
                        <Typography variant="body2">{project.description}</Typography>
                    </Box>

                    <Stack direction="row" spacing={1} mt="-5px">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                            <Chip key={index} label={tech} />
                        ))}
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Button
                            disabled={isButtonDisabled}
                            variant="contained"
                            color="primary"
                            startIcon={<ThumbUpOffAltIcon />}
                            onClick={() => handleLike(project.id)}
                        >
                            Like ({isButtonDisabled ? project.likeCount + 1 : project.likeCount})
                        </Button>

                        {myOwnProject && (
                            <Button
                                disabled={!myOwnProject}
                                variant="outlined"
                                color="primary"
                                LinkComponent={Link}
                                href={`/profile/projects/members/${project.id}`}
                            >
                                Add Member
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
