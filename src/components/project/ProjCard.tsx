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
    Dialog,
    TextField,
     useTheme,

} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Project } from "@/app/profile/projects/page";
import { likeProject, checkIfUserLiked } from "@/app/profile/projects/actions";
import { publishSuccessStory } from "@/app/projects/actions";

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

    const ownProjectButtonSx = myOwnProject
    ? {
          fontSize: "0.75rem",
          px: 1.5,
          py: 0.5,
          minHeight: "32px",
      }
    : {};

    const [open, setOpen] = React.useState(false);
    const [storyContent, setStoryContent] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);

    const [isPublishing, setIsPublishing] = React.useState(false);
    const [isPublished, setIsPublished] = React.useState(false);
    const handlePublishSuccess = async () => {
    setSubmitting(true);
    await publishSuccessStory(project.id, storyContent);
    setSubmitting(false);
    setOpen(false);
};

const theme = useTheme();




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
                                sx={ownProjectButtonSx}
                                href={`/profile/projects/members/${project.id}`}
                            >
                                Add Member
                            </Button>
                            
                        )}
                        {myOwnProject && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={ownProjectButtonSx}
                                onClick={() => setOpen(true)}
                            >
                                Publish Success
                            </Button>
                        )}


                    </Stack>
                </Stack>
            </CardContent>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <Box
                sx={{
                    backgroundColor: "#17235c",
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h6" color="white">
                        Share your success
                    </Typography>

                    <Typography variant="body2" color="rgba(255,255,255,0.75)">
                        Please share your success story for the admin to review.
                    </Typography>

                    <TextField
                        multiline
                        minRows={4}
                        fullWidth
                        placeholder="Please share your success..."
                        value={storyContent}
                        onChange={(e) => setStoryContent(e.target.value)}
                    />

                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={() => setOpen(false)}
                            color="primary"
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            disabled={!storyContent.trim() || submitting}
                            onClick={handlePublishSuccess}
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Dialog>

        </Card>
    );
}
