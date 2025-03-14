import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "./theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata: Metadata = {
    title: { default: "TeamUp", template: "%s | TeamUp" },
    description: "Find people to collaborate with",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body cz-shortcut-listen="true">
                <ClerkProvider>
                    <AppRouterCacheProvider>
                        <ThemeProvider theme={theme}>{children}</ThemeProvider>
                    </AppRouterCacheProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
