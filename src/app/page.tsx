"use client"
import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Stack, Grid2 as Grid, Avatar, CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  const handleAvatarClick = () => {
    console.log("Avatar clicked");
  };

  const handleCardClick = () => {
    console.log("Card clicked");
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <Typography gutterBottom variant="h5" component="div" color="white">
        Projects of the month
      </Typography>

      <Card sx={{ maxWidth: 600, borderRadius: 1.5 }}>
        <CardContent sx={{ padding: "8px 16px", minHeight: 50 }}>
          <Grid container alignItems="center" spacing={1}>
            <Grid>
              <Avatar
                src="/images/profile-avatar-1.png"
                alt="Profile Avatar"
                sx={{ width: 32, height: 32, cursor: "pointer" }}
                onClick={handleAvatarClick}
              />
            </Grid>
            <Grid>
              <Typography variant="h6" component="div" color="white">
                Lizard
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActionArea onClick={handleCardClick}>
          <CardMedia
            component="img"
            height="140"
            image="/images/project.png"
            alt="Project Image"
          />

          <CardContent>
            <Typography variant="body2">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}
