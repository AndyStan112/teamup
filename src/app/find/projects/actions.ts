"use server";
import { prisma } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { Direction } from "@prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";
import { Project } from "@prisma/client";
import { put } from "@vercel/blob";

export async function getPendingProjectRequests(projectId: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated.");
    }

    const [pendingRequests, currentMembers, userFriends] = await prisma.$transaction([
        prisma.pendingProjectMember.findMany({
            where: { projectId },
            select: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                    },
                },
            },
        }),

        prisma.projectMember.findMany({
            where: { projectId },
            select: { memberId: true },
        }),

        prisma.friend.findMany({
            where: { userId },
            select: {
                friend: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                    },
                },
            },
        }),
    ]);

    const pendingUserIds = new Set(pendingRequests.map((req) => req.user.id));
    const memberUserIds = new Set(currentMembers.map((m) => m.memberId));

    const filteredFriends = userFriends
        .map((friend) => friend.friend)
        .filter((friend) => !pendingUserIds.has(friend.id) && !memberUserIds.has(friend.id));

    return {
        pendingRequests: pendingRequests.map((req) => req.user),
        friends: filteredFriends,
    };
}

export async function getProjectSwipe() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const swipedProjectIds = await prisma.swipeProject.findMany({
        where: { swiperId: userId },
        select: { swipedId: true },
    });

    const swipedIdsSet = swipedProjectIds.map((swipe) => swipe.swipedId);

    const projectCount = await prisma.project.count();
    const skip = Math.floor(Math.random() * (projectCount - swipedIdsSet.length));
    const user = await prisma.project.findFirst({
        where: { id: { notIn: swipedIdsSet } },
        skip,
        select: {
            id: true,
            title: true,
            images: true,
            technologies: true,
            githubLink: true,
            description: true,
        },
    });
    return user;
}

export async function getProjectSwipeDetails(projectId: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId!,
        },
        select: {
            title: true,
            images: true,
            technologies: true,
            githubLink: true,
            description: true,
        },
    });
    return project;
}
export async function swipeProject(direction: Direction, swipedId: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    await prisma.swipeProject.create({
        data: {
            swiperId: userId,
            swipedId,
            direction,
        },
    });

    if (direction === Direction.RIGHT) {
        await prisma.pendingProjectMember.create({
            data: {
                userId,
                projectId: swipedId,
            },
        });
    }

    return await getProjectSwipe();
}
export async function createProject(formData: FormData) {
    const { userId } = await auth();

    const images = formData.getAll("images") as File[];

    const imageUploadPromises = images.map(async (image) => {
        const blob = await put(image.name, image, {
            access: "public",
        });
        return blob.url;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const formDataObject = Object.fromEntries(formData.entries());

    const project = await prisma.project.create({
        data: {
            ...formDataObject,
            originalCreatorId: userId!,
            technologies: formDataObject.technologies.toString().split(","),
            images: imageUrls,
        } as Project,
    });

    await prisma.projectMember.create({
        data: {
            projectId: project.id,
            memberId: userId!,
        },
    });

    return project;
}

export async function getCurrentUserProjects() {
    const { userId } = await auth();

    const projects = await prisma.project.findMany({
        where: {
            originalCreatorId: userId!,
        },
    });

    return projects;
}

export async function getUserProjects(userId: string) {
    const projects = await prisma.project.findMany({
        where: {
            originalCreatorId: userId!,
        },
    });

    return projects;
}

export async function likeProject(projectId: string) {
    const { userId } = await auth();
    const likeCount = await prisma.likedProject.count({
        where: {
            userId: userId!,
            projectId,
        },
    });

    if (likeCount > 0) {
        return;
    }

    await prisma.likedProject.create({
        data: {
            userId: userId!,
            projectId,
        },
    });
    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            likeCount: {
                increment: 1,
            },
        },
    });
    return updatedProject;
}

export async function getMostLikedProjects() {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const projects = await prisma.project.findMany({
        orderBy: {
            likeCount: "desc",
        },
        where: {
            dateCreated: {
                gte: start,
                lte: end,
            },
        },
    });
    return projects;
}

export async function editProject(originalProjectTitle: string, formData: FormData) {
    const { userId } = await auth();

    const images = formData.getAll("images") as File[];

    const imageUploadPromises = images.map(async (image) => {
        const blob = await put(image.name, image, {
            access: "public",
        });
        return blob.url;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const formDataObject = Object.fromEntries(formData.entries());

    const existingProject = await prisma.project.findFirst({
        where: {
            originalCreatorId: userId!,
            title: originalProjectTitle,
        },
    });

    if (!existingProject) {
        throw new Error("Project not found");
    }

    const project = await prisma.project.update({
        where: {
            id: existingProject!.id,
        },
        data: {
            ...formDataObject,
            images: imageUrls,
            technologies: formDataObject.technologies.toString().split(","),
        } as Project,
    });
    return project;
}

export async function addMember(projectId: string, userId: string) {
    await prisma.$transaction([
        prisma.projectMember.create({
            data: {
                memberId: userId,
                projectId: projectId,
            },
        }),
        prisma.pendingProjectMember.delete({
            where: {
                projectId_userId: {
                    projectId,
                    userId,
                },
            },
        }),
    ]);

    const project = await prisma.project.update({
        where: { id: projectId },
        data: {
            members: {
                connect: {
                    projectId_memberId: {
                        projectId: projectId,
                        memberId: userId,
                    },
                },
            },
        },
    });

    const existingChat = await prisma.chat.findFirst({
        where: { projectId },
        select: { id: true, users: { select: { id: true } } },
    });

    if (existingChat) {
        const existingMemberIds = existingChat.users.map((user) => user.id);

        if (!existingMemberIds.includes(userId)) {
            await prisma.chat.update({
                where: { id: existingChat.id },
                data: {
                    users: {
                        connect: { id: userId },
                    },
                },
            });
        }
    }

    return project;
}

export async function rejectMemberRequest(projectId: string, userId: string) {
    await prisma.pendingProjectMember.delete({
        where: {
            projectId_userId: {
                projectId,
                userId,
            },
        },
    });
}
