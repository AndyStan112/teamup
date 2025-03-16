"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { getFriends } from "./actions";
import { Avatar, Button } from "@mui/material";
import { createChat, Friend } from "../messages/actions";


export default function Page() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchFriends() {
            const friendsList = await getFriends();
            console.log(friends)
            setFriends(friendsList);
        }
        fetchFriends();
    }, []);

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {friends.map((friend, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg shadow">
                        <Avatar
                            src={friend.profileImage || "/"}
                            alt={friend.name}
                            className="rounded-full mr-4"
                        />
                        <div className="flex-1">
                            <p className="font-semibold">{friend.name}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button color="info">See Profile</Button>
                            <Button
                                onClick={async () => {
                                    console.log("clicked")
                                    const chatId = await createChat(friend.id);
                                    console.log(chatId)
                                    router.push(`/messages?activeId=${chatId}`);
                                }}
                            >
                                Chat
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
