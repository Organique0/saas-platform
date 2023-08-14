"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("fa0c13cf-d55f-4133-b3d2-222afc4a29e7");
    }, []);
    return null;
}