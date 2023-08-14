"use client";

import { LuZap } from "react-icons/lu";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button onClick={onClick} disabled={loading}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <LuZap className="w-4 h-2 ml-2 fill-white" />}
        </Button>
    )
}