"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAbly, useChannel } from "ably/react";
import axios from "axios";
import { Avatar, Divider, Fab, Stack, TextField, Toolbar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Message } from "./types";
import ChatMessage from "./ChatMessage";

interface User {
    id: string;
    name: string;
    profileImage?: string;
}

interface ChatBoxProps {
    chatId: string;
}

export default function ChatBox({ chatId }: ChatBoxProps) {
    const [user, setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState<string>("");
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const ably = useAbly();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/user/me");
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    useChannel(`chat-${chatId}`, (message) => {
        console.log("message ");
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message.data]);
    });

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/chat/${chatId}/messages`);
                console.log(response.data);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendChatMessage = async () => {
        if (!user || messageText.trim().length === 0) return;

        const newMessage = {
            message: messageText,
            senderId: user.id,
            chatId,
        };
        try {
            await axios.post(`/api/chat/${chatId}/messages`, newMessage);

            const channel = ably.channels.get(`chat-${chatId}`);
            channel.publish("message", newMessage);

            setMessageText("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleFormSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        sendChatMessage();
    };

    if (!user) return <p className="text-center text-gray-600 mt-5">Loading user...</p>;

    return (
        <Stack flex={3} sx={{ backgroundColor: "#161b22" }}>
            <Toolbar>
                <Avatar />
            </Toolbar>
            <Divider />
            <Stack flex={1} p={2} gap={1} sx={{ overflowY: "scroll" }}>
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} userId={user.id} />
                ))}
                <div ref={messageEndRef}></div>
            </Stack>
            <Divider />
            <Toolbar component="form" onSubmit={handleFormSubmission} sx={{ py: 1 }}>
                <TextField
                    value={messageText}
                    placeholder="Type a message..."
                    onChange={(e) => setMessageText(e.target.value)}
                    variant="outlined"
                    fullWidth
                    multiline
                    maxRows={5}
                    sx={{ flex: 1 }}
                />
                <Fab type="submit" color="primary" disabled={!messageText.trim()}>
                    <SendIcon />
                </Fab>
            </Toolbar>
        </Stack>
    );
}
