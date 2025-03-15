"use client";
import React from "react";
import {

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

export default function Navbar({project}:{project:Project}): React.ReactElement {

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
                    disabled={isButtonDisabled}
                    variant="contained"
                    color="secondary"
                    startIcon={<ThumbUpOffAltIcon />}
                    onClick={() => handleLike(project.id)}
                >
                    Like ({ isButtonDisabled? project.likeCount +1 : project.likeCount})
                </Button>
            </Stack>
        </CardContent>
    </Card>

);
}
