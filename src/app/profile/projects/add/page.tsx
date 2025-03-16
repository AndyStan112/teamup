"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { 
    TextField, Button, Stack, Typography, Container, Paper, CircularProgress, Skeleton 
} from "@mui/material";
import { createProject } from "./actions";

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
    const [pageLoading, setPageLoading] = useState(true);
    const router = useRouter(); 

    useEffect(() => {
        setTimeout(() => setPageLoading(false), 1000);
    }, []);

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

        router.push("/profile/projects");
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 3, color: "white", borderRadius: 2 }}>
                <Typography variant="h4" sx={{ textAlign: "center", mt: 1, mb: 2 }}>
                    Add a Project
                </Typography>

                {pageLoading ? (

                    <Stack spacing={2}>
                        <Skeleton variant="text" width="80%" height={40} />
                        <Skeleton variant="rectangular" width="100%" height={56} />
                        <Skeleton variant="text" width="80%" height={40} />
                        <Skeleton variant="rectangular" width="100%" height={56} />
                        <Skeleton variant="text" width="80%" height={40} />
                        <Skeleton variant="rectangular" width="100%" height={56} />
                        <Skeleton variant="text" width="80%" height={40} />
                        <Skeleton variant="rectangular" width="100%" height={56} />
                        <Skeleton variant="rectangular" width="100%" height={40} />
                        <Skeleton variant="rectangular" width="100%" height={50} />
                    </Stack>
                ) : (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Stack spacing={2}>
                            <TextField
                                name="title"
                                label="Project Title"
                                variant="outlined"
                                value={form.title}
                                onChange={handleChange}
                                fullWidth
                                slotProps={{ inputLabel: { style: { color: "white" } } }}
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
                                slotProps={{ inputLabel: { style: { color: "white" } } }} 
                                sx={{ input: { color: "white" } }}
                            />
                            <TextField
                                name="githubLink"
                                label="GitHub Link"
                                variant="outlined"
                                value={form.githubLink}
                                onChange={handleChange}
                                fullWidth
                                slotProps={{ inputLabel: { style:{ color: "white" } }}}
                                sx={{ input: { color: "white" } }}
                            />
                            <TextField
                                name="technologies"
                                label="Technologies (comma separated)"
                                variant="outlined"
                                value={form.technologies}
                                onChange={handleChange}
                                fullWidth
                                slotProps={{ inputLabel: { style: { color: "white" } }}}
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
                )}
            </Paper>
        </Container>
    );
}
