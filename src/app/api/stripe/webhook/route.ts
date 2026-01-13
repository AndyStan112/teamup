export const runtime = "nodejs";

import Stripe from "stripe";
import { prisma } from "@/utils";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const body = await req.text();
    const head = await headers();
    const signature = head.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch {
        return new Response("Webhook error", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const credits = Number(session.metadata?.credits);

        if (userId && credits > 0) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    credits: { increment: credits },
                },
            });
        }
    }

    return new Response("OK", { status: 200 });
}
