"use server";
import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";

export type Friend = {
    id: string;
    name: string;
    profileImage: string | null;
};

type Project = {
    name: string;
    picture: string;
} | null;

export async function createChat(members: Friend[], project: Project = null) {
    const { userId } = await auth();
    const memberIds = members.map((member) => member.id);
    const allMembers = [...memberIds, userId!];
    const existingChat = await prisma.chat.findFirst({
        where: {
            users: {
                every: {
                    id: { in: allMembers },
                },
            },
        },
        select: {
            id: true,
        },
    });

    if (existingChat) return existingChat.id;

    const newChat = await prisma.chat.create({
        data: {
            users: {
                connect: allMembers.map((id) => ({ id })),
            },
            imageUrl: project ? project.picture : members[0].profileImage,
            name: project ? project.name : members[0].name,
        },
        select: {
            id: true,
        },
    });

    return newChat.id;
}

export async function getChats() {
    const { userId } = await auth();

    const user = await prisma.user.findUnique({
        where: { id: userId! },
        select: { chats: true },
    });
    console.log(user);
    if (user) return user.chats;
    return [];
}
