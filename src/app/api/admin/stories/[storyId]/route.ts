import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ storyId: string }> }
) {
    try {
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // TODO: Add admin role check here

        const { storyId } = await params;
        const body = await req.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: "Status is required" },
                { status: 400 }
            );
        }

        // Validate status
        const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        const story = await prisma.successStory.update({
            where: { id: storyId },
            data: {
                status,
            },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        originalCreator: {
                            select: {
                                id: true,
                                name: true,
                                profileImage: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({ story }, { status: 200 });
    } catch (error) {
        console.error("Error updating success story:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
