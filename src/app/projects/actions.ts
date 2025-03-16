"use server";

import { prisma } from "@/utils";

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
