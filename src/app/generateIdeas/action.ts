"use server";

import OpenAI from "openai";
import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";

export async function talk(formData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { credits: true },
    });

    if (!user || user.credits <= 0) {
        throw new Error("NO_CREDITS");
    }

    await prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 1 } },
    });

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    let prompt = `Give me a ${formData.scope} oriented project that uses the following technologies: ${formData.technologies}. Do not provide project structure.`;

    if (formData.giveImplementationSteps) {
        prompt += " Also, provide implementation steps.";
    } else {
        prompt += " Do not provide implementation steps.";
    }

    if (formData.extraDetails) {
        prompt += " Take these extra details into consideration: " + formData.extraDetails;
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
}


export async function getCredits() {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { credits: true },
    });

    return user?.credits ?? 0;
}
