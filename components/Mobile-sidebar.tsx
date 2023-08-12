"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    return (
        <Sheet>
            <SheetTrigger>
                <HamburgerMenuIcon width="22" height="22" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;