import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import {
    Box,
    Container,
    CssBaseline,
    ThemeProvider,
    Toolbar,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import theme from "../theme";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
    title: { default: "TeamUp", template: "%s | TeamUp" },
    description: "Find people to collaborate with",
};

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body cz-shortcut-listen="true" className={roboto.variable}>
                <ClerkProvider>
                    <AppRouterCacheProvider>
                        <ThemeProvider theme={theme}>
                            <Navbar />
                            <Container>
                                <Toolbar />
                                <Box p={2}>
                                    <CssBaseline />
                                    {children}
                                </Box>
                            </Container>
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
