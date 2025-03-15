"use client";
import { talk } from "./action";
import MultiChipSelect from "@/components/inputs/MultiChipSelect";
import { technologies } from "@/constants/interests";
import { useState } from "react";

export default function Page() {
    const [formValues, setFormValues] = useState({
        technologies: [],
        focus: [],
        giveImplementationSteps: false,
    });

    const focusValues = [
        "Frontend",
        "Backend",
        "Fullstack",
        "Mobile development",
        "Embedded development",
        "Web development",
        "Data Science",
        "Machine Learning",
        "AI",
        "Game development",
    ];

    const handleSelectChange = (name: string, values: string[]) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: values,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await talk(formValues);
    };

    return (
        <div>
            <h1 className="mb-4">Generate project idea</h1>
            <form onSubmit={handleSubmit}>
                <MultiChipSelect
                    label="Technologies"
                    name="technologies"
                    options={technologies}
                    required
                    value={formValues.technologies}
                    onSelect={handleSelectChange}
                />
                <MultiChipSelect
                    label="Focus"
                    name="focus"
                    options={focusValues}
                    required
                    value={formValues.focus}
                    onSelect={handleSelectChange}
                />
                <label htmlFor="giveImplementationSteps">Give implementation steps </label>
                <input
                    type="checkbox"
                    checked={formValues.giveImplementationSteps}
                    onChange={(e) =>
                        setFormValues((prev) => ({
                            ...prev,
                            giveImplementationSteps: e.target.checked,
                        }))
                    }
                />
                <br></br>
                <button
                    className="bg-blue-500 p-2 rounded-2xl"
                    type="submit"
                    name="giveImplementationSteps"
                >
                    Generate project idea
                </button>
            </form>
        </div>
    );
}
