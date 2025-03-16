"use server";
import { prisma } from "@/utils";

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
    console.log(user);
    return user;
}
