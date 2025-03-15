"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import ChatBox from "./ChatBox";

interface ChatProps {
  chatId: string;
}

export default function Chat({ chatId }: ChatProps) {
  const { isLoaded, user } = useUser();
  const [client, setClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    const ablyClient = new Ably.Realtime({ authUrl: "/api/socket/auth" });
    setClient(ablyClient);

    return () => {
      ablyClient.close();
    };
  }, []);

  if (!isLoaded) return <p>Loading chat...</p>;
  if (!user) return <p>You must be logged in to access the chat.</p>;
  if (!client) return <p>Initializing chat...</p>;

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={`chat-${chatId}`}>
        <ChatBox chatId={chatId} />
      </ChannelProvider>
    </AblyProvider>
  );
}
