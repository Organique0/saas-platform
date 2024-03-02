import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const maxFreeCounts = process.env.MAX_FREE_COUNTS != null ? parseInt(process.env.MAX_FREE_COUNTS) : 0;
    return NextResponse.json({ maxFreeCounts }, { status: 200 })
}