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

    const completion = openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    completion.then((result) => console.log(result.choices[0].message));
}
