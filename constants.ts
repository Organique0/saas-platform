"use server"

import { NextRequest, NextResponse } from "next/server";

// pages/api/maxFreeCounts.js

export default function handler(req: NextRequest, res: NextResponse) {
    const maxFreeCounts = process.env.MAX_FREE_COUNTS != null ? parseInt(process.env.MAX_FREE_COUNTS) : 0;
    res.status(200).json({ maxFreeCounts });
}
