"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "var(--font-roboto)",
    },
    palette: {
        primary: {
            main: "#ca5a29",
            contrastText: "#fff",
        },
        secondary: {
            main: "#a31755",
            contrastText: "#fff",
        },
        background: {
            default: "#0d1117",
            paper: "#161b22",
        },
        mode: "dark",
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "32px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "18px",
                },
                contained: {
                    boxShadow: "none",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                },
            },
        },
    },
});

export default theme;
