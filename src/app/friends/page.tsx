"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFriends } from "./actions";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider, Container, Stack } from "@mui/material";
import { createChat, Friend } from "../messages/actions";

export default function FriendsList() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchFriends() {
            const friendsList = await getFriends();
            setFriends(friendsList);
        }
        fetchFriends();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
                My Friends
            </Typography>

            <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
                {friends.map((friend, index) => (
                    <div key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar 
                                    src={friend.profileImage || "/"} 
                                    alt={friend.name} 
                                />
                            </ListItemAvatar>
                            
                            <ListItemText
                                primary={friend.name}
                                secondary={
                                    <Typography component="span" variant="body2" sx={{ color: "text.secondary", display: "inline" }}>
                                        {friend.bio || "No bio available."}
                                    </Typography>
                                }
                            />

                            <Stack spacing={1} direction="row">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="info"
                                    onClick={() => router.push(`/users/${friend.id}`)}
                                >
                                    See Profile
                                </Button>

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={async () => {
                                        const chatId = await createChat(friend.id);
                                        router.push(`/messages?activeId=${chatId}`);
                                    }}
                                >
                                    Chat
                                </Button>
                            </Stack>
                        </ListItem>

                        {index !== friends.length - 1 && <Divider variant="inset" component="li" />}
                    </div>
                ))}
            </List>
        </Container>
    );
}
