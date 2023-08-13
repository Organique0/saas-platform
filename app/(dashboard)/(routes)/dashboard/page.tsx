"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LuArrowRight, LuCode, LuImage, LuMessageSquare, LuMusic, LuVideo } from "react-icons/lu";

export const tools = [
    {
        label: "Conversation",
        icon: LuMessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation",
    },
    {
        label: "Music Generation",
        icon: LuMusic,
        color: "text-sky-500",
        bgColor: "bg-sky-500/10",
        href: "/music",
    },
    {
        label: "Image Generation",
        icon: LuImage,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        href: "/image",
    },
    {
        label: "Video Generation",
        icon: LuVideo,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        href: "/video",
    },
    {
        label: "Code Generation",
        icon: LuCode,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        href: "/code",
    },
]
export default function DashboardPage() {
    const router = useRouter();
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl text-center font-bold">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">

                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        key={tool.href}
                        onClick={() => router.push(tool.href)}
                        className="border-black/5 p-4 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <LuArrowRight className="h-5 w-5" />
                    </Card>
                ))}
            </div>
        </div>

    )
}