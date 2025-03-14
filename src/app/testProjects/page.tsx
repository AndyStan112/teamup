"use client";
import { useState } from "react";
import {
    createProject,
    getCurrentUserProjects,
    getUserProjects,
    likeProject,
} from "./actions"; // Import Server Action

export default function Page() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        githubLink: "",
        technologies: "",
        images: [], // Store selected images
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
        setForm({ ...form, images: selectedFiles });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append text fields
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("githubLink", form.githubLink);
        formData.append("technologies", form.technologies);

        // Append each file separately
        form.images.forEach((file) => {
            formData.append("images", file);
        });

        await createProject(formData);
    };

    return (
        <div className="flex flex-col h-[200px] justify-between">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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

                {/* Multiple file input */}
                <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <button type="submit">Submit</button>
            </form>
            <button
                onClick={async () => {
                    const projects = await getCurrentUserProjects();
                    console.log(projects);
                }}
            >
                Get current user projects
            </button>
            <button
                onClick={async () => {
                    const projects = await getUserProjects(
                        "user_2uK71lfC7JgpFRUtk9Uob2kd8e2"
                    );
                    console.log(projects);
                }}
            >
                Test user projects
            </button>
            <button
                onClick={() =>
                    likeProject("b109ba1a-e273-431c-a30c-3c35c0445af1")
                }
            >
                test like project
            </button>
        </div>
    );
}
