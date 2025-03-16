"use server";

import OpenAI from "openai";

export async function talk(formData) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    let prompt = `Give me a ${formData.focus} oriented project that uses the following technologies: ${formData.technologies}. Do not provide project structure.`;
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
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return completion.choices[0].message.content;
}
