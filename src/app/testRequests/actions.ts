"use server";
import { prisma } from "@/utils";
import { User } from "@prisma/client";
import { put } from "@vercel/blob";
import { auth } from "@clerk/nextjs/server";

export async function addUser(formData: FormData) {
    const { userId } = await auth();
    const imageFile = formData.get("profileImage") as File;
    const { url } = await put(imageFile.name, imageFile, {
        access: "public",
    });
    const formDataObject = Object.fromEntries(formData.entries());

    const user = await prisma.user.create({
        data: {
            ...formDataObject,
            profileImage: url || "",
            id: userId,
            age: Number(formDataObject.age),
            languages: formDataObject.languages.split(","),
            technologies: formDataObject.technologies.split(","),
        } as User,
    });
    return user;
}
