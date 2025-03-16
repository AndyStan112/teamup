"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSpecificProject } from "../actions";
import ProjCard from "@/components/project/ProjCard";
import { Container } from "@mui/material";

export default function Page() {
    const params = useParams();
    const projectId = params?.projectId as string;

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        if (!projectId) return; // Prevent fetching with undefined ID

        setLoading(true);
        getSpecificProject(projectId)
            .then((project) => setProject(project))
            .catch((error) => console.error("Error fetching project:", error))
            .finally(() => setLoading(false));
    }, [projectId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (
        <Container maxWidth="md" sx={{ py: 2 }}>
            <ProjCard project={project} />
        </Container>
    );
}
