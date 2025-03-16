"use client";
import { useEffect, useState } from "react";
import { getPendingProjectRequests, addMember, rejectMemberRequest } from "../actions";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";

type User = {
    id: string;
    name: string;
    profileImage: string | null;
};

export default function ProjectMemberManagement({ projectId }: { projectId: string }) {
    const [pendingRequests, setPendingRequests] = useState<User[]>([]);
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const data = await getPendingProjectRequests(projectId);
            setPendingRequests(data.pendingRequests);
            setFriends(data.friends);
            setLoading(false);
        };
        fetchUsers();
    }, [projectId]);

    const handleAccept = async (userId: string) => {
        await addMember(projectId, userId);
        setPendingRequests(pendingRequests.filter((user) => user.id !== userId));
    };

    const handleReject = async (userId: string) => {
        await rejectMemberRequest(projectId, userId);
        setPendingRequests(pendingRequests.filter((user) => user.id !== userId));
    };

    const handleAddFriend = async (userId: string) => {
        await addMember(projectId, userId);
        setFriends(friends.filter((user) => user.id !== userId));
    };

    return (
        <Stack spacing={4}>
            <Typography variant="h6">Pending Requests</Typography>
            <List>
                {pendingRequests.length > 0 ? (
                    pendingRequests.map((user) => (
                        <ListItem key={user.id} secondaryAction={
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={() => handleAccept(user.id)}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => handleReject(user.id)}>Reject</Button>
                            </Stack>
                        }>
                            <ListItemAvatar>
                                <Avatar src={user.profileImage || "/default_avatar.png"} />
                            </ListItemAvatar>
                            <ListItemText primary={user.name} />
                        </ListItem>
                    ))
                ) : (
                    <Typography>No pending requests.</Typography>
                )}
            </List>

            <Typography variant="h6">Friends</Typography>
            <List>
                {friends.length > 0 ? (
                    friends.map((user) => (
                        <ListItem key={user.id} secondaryAction={
                            <Button variant="contained" onClick={() => handleAddFriend(user.id)}>Add to Project</Button>
                        }>
                            <ListItemAvatar>
                                <Avatar src={user.profileImage || "/default_avatar.png"} />
                            </ListItemAvatar>
                            <ListItemText primary={user.name} />
                        </ListItem>
                    ))
                ) : (
                    <Typography>No available friends to add.</Typography>
                )}
            </List>
        </Stack>
    );
}
