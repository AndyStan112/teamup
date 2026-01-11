"use client";

import { Button, Stack } from "@mui/material";
import { createCheckoutSession } from "../action";

export default function BuyCredits() {
    const buy = async (credits: number) => {
        const url = await createCheckoutSession(credits);
        window.location.href = url!;
    };

    return (
        <Stack gap={2}>
            <Button variant="contained" onClick={() => buy(1)}>
                Buy 1 credit (1 RON)
            </Button>
            <Button variant="outlined" onClick={() => buy(5)}>
                Buy 5 credits (5 RON)
            </Button>
            <Button variant="outlined" onClick={() => buy(10)}>
                Buy 10 credits (10 RON)
            </Button>
        </Stack>
    );
}
