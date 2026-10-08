"use server";

import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const packagePrices = new Map([
    [1, 300],
    [5, 500],
    [10, 1000],
]);

export async function createCheckoutSession(credits: number) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const unitAmount = packagePrices.get(credits);
    if (unitAmount === undefined) throw new Error("Invalid credit package");

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "ron",
                    unit_amount: unitAmount,
                    product_data: {
                        name: `${credits} credit${credits > 1 ? "s" : ""}`,
                    },
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits/cancel`,
        metadata: {
            userId,
            credits: credits.toString(),
        },
    });

    return session.url;
}
