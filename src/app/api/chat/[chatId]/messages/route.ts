import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { chatId?: string } }) {
    const {chatId} = await context.params;
    console.log(chatId)
  if (!chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }

  try {
    const messages = await prisma.messages.findMany({
      where: { chatId },
      orderBy: { timestamp: "asc" },
    });
    console.log(messages)
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Error fetching messages" }, { status: 500 });
  }
}

export async function POST(req: Request, context: { params: { chatId?: string } }) {
  const {chatId} = await context.params;

  if (!chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }

  try {
    const { message, senderId } = await req.json();

    const newMessage = await prisma.messages.create({
      data: { message, senderId, chatId },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Error sending message" }, { status: 500 });
  }
}
