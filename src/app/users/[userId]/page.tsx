"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSpecificUser } from "./actions";
import { Chip } from "@mui/material";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ProjCard from "@/components/project/ProjCard";

export default function Page() {
    const params = useParams();
    const userId = params?.userId as string;
    const [user, setUser] = useState<any>();
    useEffect(() => {
        getSpecificUser(userId).then((user) => {
            setUser(user);
        });
    }, [userId]);

    return (
        <div className="flex flex-col justify-center items-center">
            <img src={user?.profileImage}></img>
            <div className="flex items-center my-2">
                <h1 className="font-bold mr-8">{user?.name}</h1>
                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<GitHubIcon />}
                    component="a"
                    href={user?.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                >
                    GitHub Profile
                </Button>
            </div>
            <p>
                From: {user?.city}, {user?.country}
            </p>
            <h2>Description: {user?.description}</h2>
            <div>
                <h1>Technologies:</h1>
                {user?.technologies?.map((tech, index) => <Chip key={index} label={tech} />)}
            </div>
            <h1 className="font-bold my-3">Created projects:</h1>
            <div className="max-w-2xl">
                {user?.createdProjects.map((project, index) => <ProjCard project={project} />)}
            </div>
        </div>
    );
}
