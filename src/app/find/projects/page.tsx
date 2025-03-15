"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Avatar, Stack, Button, Chip, Box } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { getMostLikedProjects, likeProject } from "./actions";

export default function SwipeProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getMostLikedProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  const handleSwipe = async (action: "LIKE" | "DISLIKE") => {
    if (action === "LIKE") {
      await likeProject(projects[currentIndex].id);
    }

    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setProjects([]);
    }
  };

  if (!projects.length) return <Typography variant="h6" color="white">Loading...</Typography>;

  const project = projects[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d1117] overflow-hidden">
      <Typography variant="h5" sx={{ color: "white", marginBottom: 2 }}>
        Find projects
      </Typography>
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ borderRadius: 2, backgroundColor: "#131d4c", color: "white", width: "100%", height: "100%", marginTop: 1 }}>
          <CardContent sx={{ padding: "16px", textAlign: "center" }}>
            <Stack alignItems="center">
              <Avatar src={project.image || ""} alt="Project image" sx={{ width: 64, height: 64 }} />
            </Stack>
          </CardContent>

          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h6">{project.title}</Typography>
              <Typography variant="body1">{project.githubLink}</Typography>

              <Box display="flex" gap={1} flexWrap="wrap">
                {project.languages.map((value: string, key: number) => <Chip key={key} label={value} />)}
              </Box>

              <Typography variant="body1">Technologies:</Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {project.technologies.map((value: string, key: number) => <Chip key={key} label={value} />)}
              </Box>

              <Typography variant="body1">Description:</Typography>
              <Typography variant="body2">{project.description}</Typography>

              <Typography className="text-blue-200 cursor-pointer hover:underline" sx={{ mt: 2 }}>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">Github</a>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      <Stack direction="row" gap={3} sx={{ marginTop: 2 }}>
        <Button variant="outlined" sx={{ flex: 1 }} startIcon={<ThumbDownOffAltIcon />} onClick={() => handleSwipe("DISLIKE")}>
          Dislike
        </Button>
        <Button variant="contained" sx={{ flex: 1 }} endIcon={<ThumbUpOffAltIcon />} onClick={() => handleSwipe("LIKE")}>
          Like
        </Button>
      </Stack>
    </div>
  );
}
