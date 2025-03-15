"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";
const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

const chats = [
    { id: "1", name: "Iris Veress" },
    { id: "2", name: "John Doe" },
    { id: "3", name: "Jane Smith" },
];

export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState("");

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r p-4">
                <h2 className="font-semibold mb-4">Chats</h2>
                <ul>
                    {chats.map((chat) => (
                        <li key={chat.id} className="mb-2">
                            <Button
                                aria-selected={activeChat === chat.id}
                                className="w-full"
                                onClick={() => setActiveChat(chat.id)}
                            >
                                {chat.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-4">
                {activeChat!=="" ? <Chat chatId={activeChat} /> :<p>No chat selected</p>}
            </div>
        </div>
    );
}
