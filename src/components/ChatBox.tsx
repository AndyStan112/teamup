"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAbly, useChannel } from "ably/react";
import axios from "axios";

interface Message {
  id: string;
  message: string;
  senderId: string;
  chatId: string;
  timestamp: string;
}

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
    console.log("message ")  
    console.log(message)
    setMessages((prevMessages) => [...prevMessages, message.data]);
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${chatId}/messages`);
        console.log(response.data)
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
    <div className="flex flex-col w-full max-w-2xl text-black mx-auto h-[80vh] border border-gray-300 rounded-lg shadow-md">

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 max-w-xs sm:max-w-sm rounded-lg ${
              message.senderId === user.id ? "bg-blue-500 text-black self-end ml-auto" : "bg-gray-200 text-red-800 self-start"
            }`}
          >
            {message.message}
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      <form onSubmit={handleFormSubmission} className="flex items-center border-t border-gray-300 p-3 bg-white">
        <textarea
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!messageText.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
