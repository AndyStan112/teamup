import React from "react";
import { Typography, Paper, Stack } from "@mui/material";
import { Message } from "./types";
import MuiMarkdown from "mui-markdown";

interface ChatMessageProps {
    message: Message;
    userId: string;
    groupChat?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, userId, groupChat = false }) => {
    const isMyself = message.senderId === userId;

    return (
        <Stack direction="column" gap={0.5} alignItems={isMyself ? "end" : "start"}>
            {groupChat && !isMyself && (
                <Typography variant="body2" fontSize={12} color="textSecondary">
                    {message.senderId}
                </Typography>
            )}
            <Paper
                elevation={3}
                component={Stack}
                px={1}
                py={0.5}
                maxWidth="90%"
                width="fit-content"
                overflow="hidden"
                sx={{
                    "& img": {
                        maxHeight: 200,
                    },
                }}
            >
                <Typography component="div" variant="body1">
                    <MuiMarkdown>{message.message}</MuiMarkdown>
                </Typography>
                <Typography variant="caption" color="textSecondary" textAlign="right">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Typography>
            </Paper>
        </Stack>
    );
};

export default ChatMessage;
