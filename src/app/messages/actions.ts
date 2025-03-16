"use server";
import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";

export async function createChat({ userId, projectId }: { userId?: string; projectId?: string }) {
    const { userId: currentUserId } = await auth();

    if (!currentUserId) throw new Error("User not authenticated.");

    if (userId && projectId) throw new Error("Provide only userId or projectId, not both.");

    let allMembers: string[] = [];

    if (userId) {
        allMembers = [currentUserId, userId];
    } else if (projectId) {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: { members: { select: { memberId: true } } },
        });

        if (!project) throw new Error("Project not found.");

        allMembers = [currentUserId, ...project.members.map((m) => m.memberId)];
    } else {
        throw new Error("Either userId or projectId must be provided.");
    }

    const existingChat = await prisma.chat.findFirst({
        where: {
            users: {
                every: { id: { in: allMembers } },
            },
        },
        select: { id: true },
    });

    if (existingChat) return existingChat.id;

    const newChat = await prisma.chat.create({
        data: {
            users: {
                connect: allMembers.map((id) => ({ id })),
            },
            project: projectId ? { connect: { id: projectId } } : undefined,
        },
        select: { id: true },
    });

    return newChat.id;
}

export async function getChats() {
    const { userId } = await auth();

    const user = await prisma.user.findUnique({
        where: { id: userId! },
        select: {
            chats: {
                include: {
                    project: {
                        select: {
                            title: true,
                            images: true,
                        },
                    },
                    users: {
                        select: {
                            id: true,
                            name: true,
                            profileImage: true,
                        },
                    },
                    messages: {
                        include: { sender: { select: { name: true, profileImage: true } } },
                    },
                },
            },
        },
    });

    if (!user) return [];
    console.log(user.chats);
    return user.chats.map((chat) => {
        const isProjectChat = chat.project !== null;
        const otherUser = chat.users.find((u) => u.id !== userId);

        return {
            id: chat.id,
            name: isProjectChat ? chat.project!.title : otherUser?.name || "Unknown Chat",
            imageUrl: isProjectChat
                ? chat.project!.images?.[0] || "/default_project.png"
                : otherUser?.profileImage || "/default_avatar.png",
        };
    });
}
