"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Avatar, Grid2 as Grid, Stack, Button } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function SwipePartners() {
  const [swiped, setSwiped] = useState(false);
  const [direction, setDirection] = useState(0);

  const profileImage = "/images/profile-avatar-1.png";

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 150) {
      setDirection(500);
      setSwiped(true);
    } else if (info.offset.x < -150) {
      setDirection(-500);
      setSwiped(true);
    } else {
      setDirection(0);
      setSwiped(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d1117] overflow-hidden">

      <Typography variant="h5" sx={{ color: "white", marginBottom:2 }}>
        Find partners
      </Typography>

      {!swiped && (
        <motion.div
        className="relative w-[80vw] md:w-[50vw] lg:w-[30vw] max-w-[320px] min-w-[280px] h-[65vh]" 
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          animate={{ x: direction, opacity: swiped ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          exit={{ x: direction, opacity: 0 }}
        >
          <Card sx={{ borderRadius: 2, backgroundColor: "#131d4c", color: "white", width: "100%", height: "100%", marginTop: 1 }}>
            <CardContent sx={{ padding: "16px", textAlign: "center" }}>
              <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid >
                  <Avatar src={profileImage} alt="Profile picture" sx={{ width: 64, height: 64 }} />
                </Grid>
              </Grid>
            </CardContent>

            <CardContent>
              <Grid container justifyContent="center" spacing={3}>
                <Grid >
                  <Typography variant="body1">Nume</Typography>
                </Grid>
                <Grid >
                  <Typography variant="body1">Vârstă</Typography>
                </Grid>
                <Grid >
                  <Typography variant="body1">Sex</Typography>
                </Grid>
              </Grid>

              <Stack spacing={1} sx={{ marginTop: 2 }}>
                <Typography variant="body1">Limbi</Typography>
                <Typography variant="body1">Tehnologii</Typography>
                <Typography variant="body1">Work timing</Typography>
              </Stack>

              <Typography className="text-blue-200 cursor-pointer hover:underline" sx={{ mt: 2 }}>
                Check Projects
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      )}


      <Stack direction="row" gap={3} sx={{ marginTop: 2}}>
        <Button variant="outlined" sx={{ flex: 1 }} startIcon={<ThumbDownOffAltIcon />}>
          Dislike
        </Button>
        <Button variant="contained" sx={{ flex: 1 }} endIcon={<ThumbUpOffAltIcon />}>
          Like
        </Button>
      </Stack>
    </div>
  );
}
