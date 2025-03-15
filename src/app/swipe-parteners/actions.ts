"use server";
import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";


export async function getSwipe() {

    const {userId}  =  await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const swipedUserIds = await prisma.swipe.findMany({
        where: { swiperId: userId },
        select: { swipedId: true },
    });

    const swipedIdsSet = swipedUserIds.map(swipe => swipe.swipedId)

    const userCount = await prisma.user.count();
    const skip = Math.floor(Math.random() * userCount);
    const user = await prisma.user.findFirst({
        where:{id:{notIn:swipedIdsSet}},
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

export async function getSwipeDetails(userId: string) {

    const user = await prisma.user.findUnique({
        where: {
            id: userId!,
        },
        select: {
            country: true,
            city: true,
            description: true,
            createdProjects: {take:3,orderBy:{dateCreated:"desc"}},
        },
    });
    return user;
}

