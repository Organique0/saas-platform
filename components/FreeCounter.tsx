"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { LuZap } from "react-icons/lu";
import { useProModal } from "@/hooks/view-pro-modal";
import axios from "axios";


interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
}

const FreeCounter = ({ apiLimitCount, isPro }: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);
    const [maxFree, setMaxFree] = useState(0);
    const proModal = useProModal();


    useEffect(() => {
        setMounted(true);
        const fetchMaxFreeCounts = async () => {
            try {
                const response = await axios.post('/api/maxFreeCounts');
                setMaxFree(response.data.maxFreeCounts);
            } catch (error) {
                console.error('Error fetching MAX_FREE_COUNTS:', error);
            }
        };
        fetchMaxFreeCounts();
    }, []);
    if (!mounted) return null;

    if (isPro) return null;

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-10">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <div>
                            {apiLimitCount} / {maxFree} Free generations
                        </div>
                        <Progress className="h-3 bg-white" value={(apiLimitCount / maxFree) * 100} />
                    </div>
                    <Button className="w-full" variant="premium" onClick={proModal.onOpen}>
                        Upgrade <LuZap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default FreeCounter;