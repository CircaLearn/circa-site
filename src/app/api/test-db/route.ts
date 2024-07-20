import { NextResponse } from "next/server";
import connect from "@/lib/db";

export const GET = async () => {
    try {
        await connect();
        return new NextResponse("Successfully connected!", {status: 200})
    } catch(error) {
        return new NextResponse("ERROR: Failed to connect" + error, {status: 500})
    }
}