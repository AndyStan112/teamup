"use client";
import { useParams } from "next/navigation";
import ProjectMemberManagement from "../ProjectMemberManagement";

export default function Page() {
    const params = useParams();
    const projectId = params?.projectId as string;

    return <ProjectMemberManagement projectId={projectId} />;
}
