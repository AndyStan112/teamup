"use server";
import { prisma } from "@/utils";
import { put } from "@vercel/blob"; // Import Vercel Blob SDK
import { auth } from "@clerk/nextjs/server";
import { Project } from "@prisma/client";

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
            technologies: formDataObject.technologies.split(","),
            images: imageUrls,
        } as Project,
    });

    return project;
}
