"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tools } from "@/tools";
import { useRouter } from "next/navigation";
import { LuArrowRight } from "react-icons/lu";

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