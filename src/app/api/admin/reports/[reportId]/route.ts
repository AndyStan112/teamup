import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ reportId: string }> },
) {
    try {
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // TODO: Add admin role check here

        const { reportId } = await params;
        const body = await req.json();
        const { status, reviewNotes } = body;

        if (!status) {
            return NextResponse.json({ error: "Status is required" }, { status: 400 });
        }

        // Validate status
        const validStatuses = ["PENDING", "UNDER_REVIEW", "RESOLVED", "DISMISSED"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const report = await prisma.report.update({
            where: { id: reportId },
            data: {
                status,
                reviewedAt: new Date(),
                reviewNotes: reviewNotes || null,
            },
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
        });

        return NextResponse.json({ report }, { status: 200 });
    } catch (error) {
        console.error("Error updating report:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
