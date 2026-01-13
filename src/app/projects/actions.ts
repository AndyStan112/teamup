"use server";

import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";


export async function getSpecificProject(projectId: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            title: true,
            description: true,
            githubLink: true,
            images: true,
            technologies: true,
            originalCreator: true,
            originalCreatorId: true,
            likeCount: true,
        },
    });
    return project;
}

export async function publishSuccessStory(projectId: string, content: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { originalCreatorId: true },
    });

    if (!project) throw new Error("Project not found");
    if (project.originalCreatorId !== userId) throw new Error("Forbidden");

    const existing = await prisma.successStory.findFirst({
        where: {
            projectid: projectId,
            status: "PENDING",
        },
    });

    if (existing) return;

    await prisma.successStory.create({
        data: {
            projectid: projectId,
            content,
            status: "PENDING",
        },
    });
}