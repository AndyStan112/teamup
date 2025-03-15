"use server";
import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { Direction } from "@prisma/client";

export async function getProjectSwipe() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const swipedProjectIds = await prisma.swipeProject.findMany({
        where: { swiperId: userId },
        select: { swipedId: true },
    });

    const swipedIdsSet = swipedProjectIds.map((swipe) => swipe.swipedId);

    const projectCount = await prisma.project.count();
    const skip = Math.floor(Math.random() * (projectCount - swipedIdsSet.length));
    const user = await prisma.project.findFirst({
        where: { id: { notIn: swipedIdsSet } },
        skip,
        select: {
            id: true,
            title: true,
            images: true,
            technologies: true,
            githubLink: true,
            description: true,
        },
    });
    return user;
}

export async function getProjectSwipeDetails(projectId: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId!,
        },
        select: {
            title: true,
            images: true,
            technologies: true,
            githubLink: true,
            description: true,
        },
    });
    return project;
}

export async function swipeProject(direction: Direction, swipedId: string) {
    await prisma.swipeProject.create({
        data: {
            swiperId: (await auth()).userId!,
            swipedId,
            direction,
        },
    });
    return await getProjectSwipe();
}
