"use client";
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="font-bold py-36 text-center space-y-5 text-white">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>A Collection of AI Tools for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent options={{
                        strings: [
                            "Chatting",
                            "Photo Generation",
                            "Music Generation",
                            "Code Generation",
                            "Video Generation"
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Create content using Ai 10x faster (and worse)
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="premium" className="rounded-full font-semibold p-4 md:text-lg md:p-6">
                        Start generating for Free
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required, free version limited to 5 prompts
            </div>
        </div>
    )
}