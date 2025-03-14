"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "var(--font-roboto)",
    },
    palette: {
        primary: {
            light: "#757ce8",
            main: "#ca5a29",
            dark: "#002884",
            contrastText: "#fff",
        },
        secondary: {
            light: "#294892",
            main: "#a31755",
            dark: "#081554",
            contrastText: "#fff",
        },
        background: {
            default: "#0d1117",
            paper: "#161b22",
        },
        mode: "dark",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                },
                contained: {
                    boxShadow: "none",
                },
            },
        },
    },
});

export default theme;
