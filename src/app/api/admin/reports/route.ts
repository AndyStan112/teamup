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

        const reports = await prisma.report.findMany({
            include: {
                reporter: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                    },
                },
                reportedUser: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ reports }, { status: 200 });
    } catch (error) {
        console.error("Error fetching reports:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
