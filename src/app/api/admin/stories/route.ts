import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // TODO: Add admin role check here
        // For now, any authenticated user can access this

        const stories = await prisma.successStory.findMany({
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
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ stories }, { status: 200 });
    } catch (error) {
        console.error("Error fetching success stories:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
