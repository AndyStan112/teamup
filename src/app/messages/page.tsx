"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Avatar, Button } from "@mui/material";
import { getChats } from "./actions";
import { type Chat } from "@prisma/client";
const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });



export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState("");
    const [chats,setChats] = useState<Chat[]>([])
    useEffect(()=>{
        const  fetchChats= async () => {
            const chats =await   getChats();
            setChats(chats);
        }
        fetchChats();
    },[])

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r p-4">
                <h2 className="font-semibold mb-4">Chats</h2>
                <ul>
                    {chats.map((chat) => (
                        <li key={chat.id} className="mb-2 flex">
                             <Avatar
                            src={chat.imageUrl || "/"}
                            alt={chat.name}
                            className="rounded-full mr-4"
                        />
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
