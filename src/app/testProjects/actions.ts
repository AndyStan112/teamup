"use server";
import { prisma } from "@/utils";
import { put } from "@vercel/blob"; // Import Vercel Blob SDK
import { auth } from "@clerk/nextjs/server";
import { Project } from "@prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";

export async function createProject(formData: FormData) {
    const { userId } = await auth();

    const images = formData.getAll("images") as File[];

    const imageUploadPromises = images.map(async (image) => {
        const blob = await put(image.name, image, {
            access: "public",
        });
        return blob.url;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const formDataObject = Object.fromEntries(formData.entries());

    const project = await prisma.project.create({
        data: {
            ...formDataObject,
            originalCreatorId: userId!,
            technologies: formDataObject.technologies.toString().split(","),
            images: imageUrls,
        } as Project,
    });

    return project;
}

export async function getCurrentUserProjects() {
    const { userId } = await auth();

    const projects = await prisma.project.findMany({
        where: {
            originalCreatorId: userId!,
        },
    });

    return projects;
}

export async function getUserProjects(userId: string) {
    const projects = await prisma.project.findMany({
        where: {
            originalCreatorId: userId!,
        },
    });

    return projects;
}

export async function likeProject(projectId: string) {
    const { userId } = await auth();
    const likes = await prisma.likedProject.count({
        where: {
            userId: userId!,
            projectId,
        },
    });

    if (likes > 0) {
        return;
    }
    console.log("liking project");
    console.log(projectId);
    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            likeCount: {
                increment: 1,
            },
        },
    });
    return updatedProject;
}

export async function getMostLikedProjects() {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const projects = await prisma.project.findMany({
        orderBy: {
            likeCount: "desc",
        },
        where: {
            dateCreated: {
                gte: start,
                lte: end,
            },
        },
    });
    return projects;
}

export async function editProject(originalProjectTitle: string, formData: FormData) {
    const { userId } = await auth();

    const images = formData.getAll("images") as File[];

    const imageUploadPromises = images.map(async (image) => {
        const blob = await put(image.name, image, {
            access: "public",
        });
        return blob.url;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const formDataObject = Object.fromEntries(formData.entries());

    const existingProject = await prisma.project.findFirst({
        where: {
            originalCreatorId: userId!,
            title: originalProjectTitle,
        },
    });

    if (!existingProject) {
        throw new Error("Project not found");
    }

    const project = await prisma.project.update({
        where: {
            id: existingProject!.id,
        },
        data: {
            ...formDataObject,
            images: imageUrls,
            technologies: formDataObject.technologies.toString().split(","),
        } as Project,
    });
    return project;
}
