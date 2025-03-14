import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material";
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
            <body>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </body>
        </html>
    );
}
