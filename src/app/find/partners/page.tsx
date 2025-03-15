"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Avatar, Stack, Button, Chip, Box } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { getUserSwipe, swipeUser } from "./actions";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SwipePartners() {
  const [user, setUser] = useState<any>(null);
  const [swiped, setSwiped] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserSwipe();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  const handleSwipe = async (dir: "LIKE" | "DISLIKE") => {
    if (!user) return;

    await swipeUser(dir === "LIKE" ? "RIGHT" : "LEFT", user.id);
    setSwiped(true);
    setTimeout(async () => {
      const newUser = await getUserSwipe();
      setUser(newUser);
      setSwiped(false);
    }, 400);
  };

  const handleDragEnd = async (event: any, info: any) => {
    if (info.offset.x > 150) {
      setDirection(500);
      await handleSwipe("LIKE");
    } else if (info.offset.x < -150) {
      setDirection(-500);
      await handleSwipe("DISLIKE");
    } else {
      setDirection(0);
    }
  };

  const genderMapping: { [key: string]: string } = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
    DONOTWANTTOSAY: "",
  };

  if (!user) return <Typography variant="h6" color="white">Loading...</Typography>;

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d1117] overflow-hidden">
      <Typography variant="h5" sx={{ color: "white", marginBottom: 2 }}>
        Find partners
      </Typography>

      {!swiped && (
        <motion.div
          className="relative w-[80vw] md:w-[50vw] lg:w-[30vw] max-w-[320px] min-w-[280px] h-[60vh]"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          animate={{ x: direction, opacity: swiped ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          exit={{ x: direction, opacity: 0 }}
        >
          <Card sx={{ 
            borderRadius: 2, 
            backgroundColor: "#131d4c", 
            color: "white", 
            width: "100%", 
            height: "100%", 
            marginTop: 4, 
            position: "relative", 
            overflow: "visible" }}>
            
            <Stack alignItems="center">
              <Avatar 
                src={user.profileImage} 
                alt="Profile picture" 
                sx={{ 
                  width: 90, 
                  height: 90, 
                  position: "absolute", 
                  top: "-45px",
                  backgroundColor: "#131d4c",
                  border: "3px solid #131d4c"
                }} 
              />
            </Stack>

            <CardContent sx={{ padding: "16px", marginTop: 4 }}>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="center" spacing={3}>
                  <Typography variant="body1">{user.name}</Typography>
                  <Typography variant="body1">{user.age}</Typography>
                  <Typography variant="body1">{genderMapping[user.gender]}</Typography>
                </Stack>

                <Stack spacing={0.5}>
                  <Typography variant="body1">Languages:</Typography>  {/* Adds vertical space */}
                  <Box display="flex" gap={0.8} flexWrap="wrap">
                    {user.languages.map((value: string, key: number) => <Chip key={key} label={value} />)}
                  </Box>

                  <Typography variant="body1">Technologies:</Typography> {/* Adds vertical space */}
                  <Box display="flex" gap={0.8} flexWrap="wrap">
                    {user.technologies.map((value: string, key: number) => <Chip key={key} label={value} />)}
                  </Box>

                  <Typography variant="body1">Work Timing:</Typography> {/* Adds vertical space */}
                  <Box display="flex" gap={0.8} flexWrap="wrap">
                    {user.languages.map((value: string, key: number) => <Chip key={key} label={value} />)}
                  </Box>
                </Stack>


                <Button 
                variant="outlined"
                sx={{ 
                  flex: 1,
                  color: "white", 
                  borderColor: "white", 
                  "&:hover": { 
                    backgroundColor: "white",
                    color: "black", 
                  }
                }} 
                startIcon={<GitHubIcon />} 
                component="a" 
                href={user.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Github Profile
              </Button>

              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Stack direction="row" gap={3} sx={{ marginTop: 5 }}>
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
