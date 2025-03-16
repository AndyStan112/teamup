import { Box, Container, Paper } from "@mui/material";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box minHeight="80vh" position="relative">
            <Box
                height="45vh"
                width="100%"
                position="absolute"
                top={0}
                zIndex={-500}
                sx={{
                    backgroundImage: "linear-gradient(to right, #ca5a29, #a31755)",
                }}
            ></Box>
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Paper elevation={5} sx={{ borderRadius: "32px" }}>
                    {children}
                </Paper>
            </Container>
        </Box>
    );
};

export default Layout;
