"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/utils";

export async function createOrUpdateUserPrefs(formData: FormData) {
    const { userId } = await auth();

    const formDataObject = Object.fromEntries(formData.entries());
    const userPrefs = await prisma.userPreference.upsert({
        where: {
            userId: userId!,
        },
        update: {
            ...formDataObject,
        },
        create: {
            userId: userId!,
            ...formDataObject,
        },
    });

    return userPrefs;
}
