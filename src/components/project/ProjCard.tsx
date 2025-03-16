"use client";
import React from "react";
import {

    Box,
    Button,

    Card,

    CardContent,

    CardMedia,

    Chip,

    Stack,

    Typography,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Project } from "@/app/profile/projects/page";
import { likeProject } from "@/app/profile/projects/actions";
import GitHubIcon from "@mui/icons-material/GitHub";

const title = "TeamUp";

const pages = [
    { label: "Find Partners", href: "/find/partners" },
    { label: "Find Projects", href: "/find/projects" },
    { label: "Generate ideas", href: "/generateIdeas" },
];

const settings = [
    { label: "My Profile", href: "/profile" },
    { label: "My Projects", href: "/projects" },
];

export default function Navbar({ project }: { project: Project }): React.ReactElement {

    const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(false);

    const handleLike = async (projectId: string) => {
        await likeProject(projectId);
        setIsButtonDisabled(true);
    };

    return (<Card

        sx={{ backgroundColor: "#131d4c", color: "white", borderRadius: 2 }}
    >
        {project.images.length > 0 && (
            <CardMedia
                component="img"
                height="100"
                image={project.images[0]}
                alt="Project image"
                sx={{ objectFit: "cover" }}
            />
        )}
        <CardContent sx={{p: 1.8, pb: "16px !important"}}>
            <Stack gap={1}>

                <Box>
                    <Typography variant="h6">{project.title}</Typography>
                    <Typography variant="body2">
                        {project.description}
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} mt="-5px">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                        <Chip
                            key={index}
                            label={tech}
                        />
                    ))}
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button
                        disabled={isButtonDisabled}
                        variant="outlined"
                        color="primary"
                        startIcon={<ThumbUpOffAltIcon />}
                        onClick={() => handleLike(project.id)}
                    >
                        Like ({isButtonDisabled ? project.likeCount + 1 : project.likeCount})
                    </Button>

                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<GitHubIcon />}
                        component="a"
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub Profile
                    </Button>
                </Stack>
            </Stack>
        </CardContent>
    </Card>

    );
}
