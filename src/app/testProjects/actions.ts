"use server";
import { prisma } from "@/utils";
// import { put } from "@vercel/blob";
import { auth } from "@clerk/nextjs/server";
import { Project } from "@prisma/client";

export async function createProject(formData: FormData) {
    const { userId } = await auth();

    const formDataObject = Object.fromEntries(formData.entries());
    const project = await prisma.project.create({
        data: {
            ...formDataObject,
            originalCreatorId: userId!,
            technologies: formDataObject.technologies.split(","),
        } as Project,
    });
    return project;
}
