import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Roboto } from "next/font/google";

import theme from "../theme";
import Navbar from "@/components/layout/Navbar";

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
                            <CssBaseline />
                            {children}
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
