"use client";

import { getFriends } from "./actions";

export default function Page() {
    return (
        <div>
            <button
                onClick={async () => {
                    const friends = await getFriends();
                    console.log(friends);
                }}
            >
                Get friends
            </button>
        </div>
    );
}
