import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { prisma } from "./utils";
import { NextResponse } from "next/server";
import { auth as a } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher(["/"]);
export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        const { userId } = await a();

        if (!userId) {
            await auth.protect();
        }

        const user = await prisma.user.findUnique({
            where: { id: userId! },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.redirect(new URL("/profile", request.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
