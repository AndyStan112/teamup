"use client";
import { useEffect, useState } from "react";
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { getChats } from "./actions";
import { type Chat } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MessagesPage({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isChatPage = /^\/messages\/.+/.test(pathname);

    console.log(pathname);
    console.log(isChatPage);

    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            const chats = await getChats();
            console.log(chats);
            setChats(chats);
        };
        fetchChats();
    }, []);

    return (
        <Stack flex={1} direction="row" justifyContent="stretch">
            <Stack
                flex={1}
                minWidth={300}
                visibility={{ xs: isChatPage ? "collapse" : "visible", md: "visible" }}
            >
                <Toolbar>
                    <Typography variant="h6">Active Chats</Typography>
                </Toolbar>
                <Divider />
                <List>
                    {chats.map((chat) => (
                        <ListItem key={chat.id} disablePadding>
                            <ListItemButton component={Link} href={`/messages/${chat.id}`}>
                                <ListItemAvatar>
                                    <Avatar src={chat.imageUrl || "/"} alt={chat.name} />
                                </ListItemAvatar>
                                <ListItemText>{chat.name}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Stack>
            {children}
        </Stack>
    );
}
