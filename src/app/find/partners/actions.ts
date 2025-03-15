"use server";
import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { Direction } from "@prisma/client";

export async function getUserSwipe() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const swipedUserIds = await prisma.swipeUser.findMany({
        where: { swiperId: userId },
        select: { swipedId: true },
    });

    const swipedIdsSet = swipedUserIds.map((swipe) => swipe.swipedId);

    const userCount = await prisma.user.count();
    const skip = Math.floor(Math.random() * userCount);
    const user = await prisma.user.findFirst({
        where: { id: { notIn: swipedIdsSet } },
        skip,
        select: {
            id: true,
            name: true,
            profileImage: true,
            age: true,
            gender: true,
            languages: true,
            technologies: true,
            githubLink: true,
            codingTimePreference: true,
        },
    });
    return user;
}

export async function getUserSwipeDetails(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId!,
        },
        select: {
            country: true,
            city: true,
            description: true,
            createdProjects: { take: 3, orderBy: { dateCreated: "desc" } },
        },
    });
    return user;
}

export async function swipeUser(direction: Direction, swipedId: string) {
    await prisma.swipeUser.create({
        data: {
            swiperId: (await auth()).userId!,
            swipedId,
            direction,
        },
    });
    return await getUserSwipe();
}
