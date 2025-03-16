"use client";
import { useEffect, useState } from "react";
import { getPendingProjectRequests, addMember, rejectMemberRequest } from "../actions";
import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
    Divider,
    Container,
    CircularProgress
} from "@mui/material";

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
        setPendingRequests((prev) => prev.filter((user) => user.id !== userId));
    };

    const handleReject = async (userId: string) => {
        await rejectMemberRequest(projectId, userId);
        setPendingRequests((prev) => prev.filter((user) => user.id !== userId));
    };

    const handleAddFriend = async (userId: string) => {
        await addMember(projectId, userId);
        setFriends((prev) => prev.filter((user) => user.id !== userId));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
                Manage Project Members
            </Typography>

            {loading ? (
                <Stack alignItems="center">
                    <CircularProgress />
                </Stack>
            ) : (
                <Stack spacing={4}>
                    

                    <Typography variant="h6" fontWeight="bold">
                        Pending Requests
                    </Typography>
                    <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}>
                        {pendingRequests.length > 0 ? (
                            pendingRequests.map((user, index) => (
                                <div key={index}>
                                    <ListItem
                                        secondaryAction={
                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleAccept(user.id)}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleReject(user.id)}
                                                >
                                                    Reject
                                                </Button>
                                            </Stack>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={user.profileImage || "/default_avatar.png"} />
                                        </ListItemAvatar>
                                        <ListItemText primary={user.name} />
                                    </ListItem>
                                    {index !== pendingRequests.length - 1 && <Divider />}
                                </div>
                            ))
                        ) : (
                            <Typography textAlign="center" color="text.secondary">
                                No pending requests.
                            </Typography>
                        )}
                    </List>


                    <Typography variant="h6" fontWeight="bold">
                        Friends
                    </Typography>
                    <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}>
                        {friends.length > 0 ? (
                            friends.map((user, index) => (
                                <div key={index}>
                                    <ListItem
                                        secondaryAction={
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleAddFriend(user.id)}
                                            >
                                                Add to Project
                                            </Button>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={user.profileImage || "/default_avatar.png"} />
                                        </ListItemAvatar>
                                        <ListItemText primary={user.name} />
                                    </ListItem>
                                    {index !== friends.length - 1 && <Divider />}
                                </div>
                            ))
                        ) : (
                            <Typography textAlign="center" color="text.secondary">
                                No available friends to add.
                            </Typography>
                        )}
                    </List>
                </Stack>
            )}
        </Container>
    );
}
