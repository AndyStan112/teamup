"use client";
import { createProject } from "./actions";
import { useState } from "react";

export default function Page() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        githubLink: "",
        technologies: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await createProject(formData);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-between h-[240px]"
            >
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <input
                    name="githubLink"
                    type="text"
                    placeholder="github.com"
                    value={form.githubLink}
                    onChange={handleChange}
                />
                <input
                    name="technologies"
                    type="text"
                    placeholder="Tech1, tech2"
                    value={form.technologies}
                    onChange={handleChange}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
