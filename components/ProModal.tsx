"use client";

import { useProModal } from "@/hooks/view-pro-modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { tools } from "@/app/(dashboard)/(routes)/dashboard/page";
import { LuCheck, LuCode, LuImage, LuMessageSquare, LuMusic, LuVideo, LuZap } from "react-icons/lu";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            toast.error("something went wrong");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center gap-y-4 pb-2 flex-col">
                        <div className="flex items-center gapy-y-2 font-bold py-1">
                            Upgrade for more AI generations
                            <Badge className="uppercase text-sm py-1 ml-2" variant="premium">
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>

                    {tools.map((tool) => (
                        <Card key={tool.label} className="p-2 border-black/5 flex items-center justify-between">
                            <div className="gap-x-4 items-center flex">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                                </div>
                                <div className="font-semibold text-sm">
                                    {tool.label}
                                </div>
                            </div>
                            <LuCheck size={22} className="text-primary w-5 h-5" />
                        </Card>
                    ))}

                    <DialogFooter>
                        <Button size="lg" variant="premium" className="w-full" onClick={onSubscribe} disabled={loading}>
                            Upgrade <LuZap className="fill-white w-4 h-4 ml-2" />
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default ProModal;