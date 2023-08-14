import { LuCode, LuImage, LuMessageSquare, LuMusic, LuVideo } from "react-icons/lu";
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