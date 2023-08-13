"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { LuZap } from "react-icons/lu";

interface FreeCounterProps {
    apiLimitCount: number;
}

const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-10">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free generations
                        </p>
                        <Progress className="h-3 bg-white" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
                    </div>
                    <Button className="w-full" variant="premium">
                        Upgrade <LuZap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default FreeCounter;