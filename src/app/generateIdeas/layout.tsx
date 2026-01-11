"use client";

import { Box, Container, Paper, useTheme} from "@mui/material";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();

    return (
        <Box minHeight="80vh" position="relative">
            <Box
            sx={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
        >
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Paper elevation={5} sx={{ borderRadius: "32px" }}>
                    {children}
                </Paper>
            </Container>
            </Box>
        </Box>
    );
};

export default Layout;
