import { getFriends } from "./actions";
import Image from "next/image";
import { Avatar, Button } from "@mui/material";

export default async function Page() {
    const friends = await getFriends();

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
                            <Button>Chat</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
