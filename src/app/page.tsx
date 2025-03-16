"use client"
import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Stack, Grid2 as Grid, Avatar, CardActionArea, CircularProgress, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Project } from '@prisma/client';
import { getMostLikedProjects } from './actions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export interface ProjectWithCreator extends Project{
  originalCreator:{
    name: string
    profileImage: string
  }
}



export default function Page() {
    const [projects, setProjects] = React.useState<ProjectWithCreator[]>([]);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter(); 

    React.useEffect(() => {
        async function fetchProjects() {
            const data = await getMostLikedProjects();
          
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
        <Stack alignItems="center" spacing={2} sx={{ mt: 5 }}> 
            <Typography gutterBottom variant="h5" component="div" color="white">
                Projects of the month
            </Typography>

            {projects.length === 0 ? (
                <Typography variant="h6" color="gray">
                    No projects found for this month.
                </Typography>
            ) : (
                projects.map((project) => (
                    <Card key={project.id} sx={{ maxWidth: 600, borderRadius: 1.5, backgroundColor: "#131d4c" }}>
                        <CardContent sx={{ padding: "8px 16px", minHeight: 60 }}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid>
                                <Avatar
                                    src={project.originalCreator.profileImage || "/images/default-avatar.png"}
                                    alt={project.originalCreator.name}
                                    sx={{ width: 40, height: 40, cursor: "pointer" }}
                                    onClick={() => router.push(`/profile/${project.originalCreatorId}`)}
                                />
                                

                                </Grid>
                                <Grid>
                                    <Typography variant="body2" component="div" color="white" marginTop={0.8} marginBottom={-1}>
                                        {project.originalCreator.name}
                                    </Typography>
                                    <Typography variant="body2" component="div" color="white" marginTop={0.8} marginBottom={-1}>
                                        {project.title}
                                    </Typography>
                                    <Typography variant="h6" component="div" color="white">
                                        {project.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>

                        <CardActionArea onClick={() => router.push(`/projects/${project.id}`)}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={project.images?.[0] || "/images/default-project.png"}
                                alt="Project Image"
                            />

                            <CardContent>
                                <Typography variant="body2" color="white">
                                    {project.technologies.join(", ")}
                                </Typography>

                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                                    <ThumbUpIcon sx={{ color: "white", fontSize: 18 }} />
                                    <Typography variant="body2" color="white">
                                        {project.likeCount} {project.likeCount === 1 ? "Like" : "Likes"}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))
            )}
        </Stack>
    );
}
