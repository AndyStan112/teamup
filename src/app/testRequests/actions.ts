"use server";
import { prisma } from "@/utils";
import { User } from "@prisma/client";
export async function addUser() {
    const user = await prisma.user.create({
        data: {
            id: "d1f4c6e2-9c8b-45f7-bb24-6f9c59e4d8b3",
            name: "John Doe",
            profileImage: "https://example.com/images/johndoe.jpg",
            age: 29,
            gender: "MALE",
            githubLink: "https://github.com/johndoe",
            codingTimePreference: ["EVENING", "NIGHT"],
            country: "Germany",
            city: "Berlin",
            languages: ["JavaScript", "Python", "Rust"],
            technologies: ["React", "Node.js", "Docker"],
            description:
                "Software engineer passionate about open-source and scalable systems.",
        } as User,
    });
    return user;
}
