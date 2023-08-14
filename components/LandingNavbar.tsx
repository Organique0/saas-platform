"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="flex items-center justify-between p-4 bg-transparent">
            <Link href="/" className="flex items-center">
                <h1 className={cn("text-2xl text-white font-bold", font.className)}>SaaS-Ai</h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className="rounded-full bg-white text-black hover:bg-slate-200" variant="default">
                        Get started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}