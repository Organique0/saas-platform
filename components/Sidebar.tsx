"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { LuLayoutDashboard, LuMessageSquare, LuImage, LuVideo, LuMusic, LuCode, LuSettings } from "react-icons/lu";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
    {
        label: "Dashboard",
        icon: LuLayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",

    },
    {
        label: "Conversation",
        icon: LuMessageSquare,
        href: "/conversation",
        color: "text-violet-500",

    },
    {
        label: "Image Genaration",
        icon: LuImage,
        href: "/image",
        color: "text-pink-500",

    },
    {
        label: "Video Genaration",
        icon: LuVideo,
        href: "/video",
        color: "text-orange-500",

    },
    {
        label: "Music Genaration",
        icon: LuMusic,
        href: "/music",
        color: "text-emerald-500",

    },
    {
        label: "Code Genaration",
        icon: LuCode,
        href: "/code",
        color: "text-green-500",

    },
    {
        label: "Settings",
        icon: LuSettings,
        href: "/settings",

    },
]

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center mb-14 justify-center">
                    <div className="relative mr-4">
                        <h1 className={cn("text-3xl font-bold", montserrat.className)}>Saas-Ai</h1>
                    </div>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href}
                            className={cn(`
                            text-sm 
                            group 
                            flex 
                            p-3 
                            w-full 
                            justify-start 
                            font-medium 
                            cursor-pointer 
                        hover:text-white
                        hover:bg-white/10 rounded-lg

                        `, pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                        >

                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-2", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;