"use client";
import { useState } from "react";
import { TextField, Button, Stack, Typography, Container, Paper, CircularProgress } from "@mui/material";
import { createProject, getCurrentUserProjects, getUserProjects, likeProject, getMostLikedProjects, editProject } from "./actions";

type FormState = {
    title: string;
    description: string;
    githubLink: string;
    technologies: string;
    images: File[];
};


export default function Page() {
    const [form, setForm] = useState<FormState>({
        title: "",
        description: "",
        githubLink: "",
        technologies: "",
        images: [],
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        setForm({ ...form, images: selectedFiles });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("githubLink", form.githubLink);
        formData.append("technologies", form.technologies);
        form.images.forEach((file) => formData.append("images", file));

        await createProject(formData);
        setLoading(false);
    };

    return (
        <Container maxWidth="sm">

            <Paper sx={{ p: 3, color: "white", borderRadius: 2 }}>
            <Typography variant="h4" sx={{ textAlign: "center", mt: 1, mb: 2 }}>
                Project Management
            </Typography>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Stack spacing={2}>
                        <TextField
                            name="title"
                            label="Project Title"
                            variant="outlined"
                            value={form.title}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: "white" } }}
                            sx={{ input: { color: "white" } }}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            multiline
                            rows={3}
                            variant="outlined"
                            value={form.description}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: "white" } }}
                            sx={{ input: { color: "white" } }}
                        />
                        <TextField
                            name="githubLink"
                            label="GitHub Link"
                            variant="outlined"
                            value={form.githubLink}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: "white" } }}
                            sx={{ input: { color: "white" } }}
                        />
                        <TextField
                            name="technologies"
                            label="Technologies (comma separated)"
                            variant="outlined"
                            value={form.technologies}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: "white" } }}
                            sx={{ input: { color: "white" } }}
                        />
                        <Button variant="outlined" component="label">
                            Upload Images
                            <input type="file" name="images" multiple accept="image/*" hidden onChange={handleFileChange} />
                        </Button>

                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Project"}
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Stack spacing={2} sx={{ mt: 3 }}>
                <Button
                    variant="outlined"
                    onClick={async () => {
                        const projects = await getCurrentUserProjects();
                        console.log(projects);
                    }}
                >
                    Get Current User Projects
                </Button>
                <Button
                    variant="outlined"
                    onClick={async () => {
                        const projects = await getUserProjects("user_2uK71lfC7JgpFRUtk9Uob2kd8e2");
                        console.log(projects);
                    }}
                >
                    Test User Projects
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => likeProject("362b093a-8659-4f57-a9cf-efeb0a5a8cc0")}
                >
                    Like Project
                </Button>
                <Button
                    variant="contained"
                    onClick={async () => {
                        const projects = await getMostLikedProjects();
                        console.log(projects);
                    }}
                >
                    Get Most Liked Projects
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={async () => {
                        const formData = new FormData();
                        formData.append("title", form.title);
                        formData.append("description", form.description);
                        formData.append("githubLink", form.githubLink);
                        formData.append("technologies", form.technologies);
                        form.images.forEach((file) => formData.append("images", file));

                        const project = await editProject("Cool test", formData);
                        console.log(project);
                    }}
                >
                    Update Project
                </Button>
            </Stack>
        </Container>
    );
}
