"use server";
import { prisma } from "@/utils";
import { put } from "@vercel/blob";
import { auth, User } from "@clerk/nextjs/server";

export async function addOrUpdateUser(formData: FormData) {
    const { userId } = await auth();

    const imageFile = formData.get("profileImage") as File;
    let url = "";

    if (imageFile) {
        try {
            const response = await put(imageFile.name, imageFile, {
                access: "public",
            });
            if (response?.url) {
                url = response.url;
            } else {
                console.error(
                    "Error: No URL returned from the upload response."
                );
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    const formDataObject = Object.fromEntries(formData.entries());

    const user = await prisma.user.upsert({
        where: {
            id: userId!,
        },
        update: {
            ...formDataObject,
            profileImage: url || "",
            age: Number(formDataObject.age),
            languages: formDataObject.languages.split(","),
            technologies: formDataObject.technologies.split(","),
        } as User,
        create: {
            ...formDataObject,
            profileImage: url || "",
            age: Number(formDataObject.age),
            languages: formDataObject.languages.split(","),
            technologies: formDataObject.technologies.split(","),
            id: userId!,
        } as User,
    });
    return user;
}

export async function getCurrentUser() {
    const { userId } = await auth();
    const user = await prisma.user.findUnique({
        where: {
            id: userId!,
        },
        select: {
            name: true,
            profileImage: true,
            age: true,
            gender: true,
            country: true,
            city: true,
            languages: true,
            technologies: true,
            description: true,
            createdProjects: true,
            githubLink: true,
            codingTimePreference: true,
            joinedProjects: true,
        },
    });
    return user;
}

export async function getSpecificUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId!,
        },
        select: {
            name: true,
            profileImage: true,
            age: true,
            gender: true,
            country: true,
            city: true,
            languages: true,
            technologies: true,
            description: true,
            createdProjects: true,
            githubLink: true,
            codingTimePreference: true,
            joinedProjects: true,
        },
    });
    return user;
}
