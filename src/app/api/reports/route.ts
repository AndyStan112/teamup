import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { reportedUserId, reason, comments } = body;

        // Validation
        if (!reportedUserId || !reason || !comments?.trim()) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Prevent users from reporting themselves
        if (clerkUserId === reportedUserId) {
            return NextResponse.json(
                { error: "You cannot report yourself" },
                { status: 400 }
            );
        }

        // Check if both users exist
        const [reporter, reportedUser] = await Promise.all([
            prisma.user.findUnique({ where: { id: clerkUserId } }),
            prisma.user.findUnique({ where: { id: reportedUserId } }),
        ]);

        if (!reporter) {
            return NextResponse.json({ error: "Reporter not found" }, { status: 404 });
        }

        if (!reportedUser) {
            return NextResponse.json(
                { error: "Reported user not found" },
                { status: 404 }
            );
        }

        // Create the report
        const report = await prisma.report.create({
            data: {
                reporterId: clerkUserId,
                reportedUserId,
                reason,
                comments,
            },
        });

        return NextResponse.json(
            { success: true, report },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating report:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
