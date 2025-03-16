"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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

export default function MessagesPage({ children }: { children: React.ReactNode }) {
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
            <Stack flex={1}>
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
