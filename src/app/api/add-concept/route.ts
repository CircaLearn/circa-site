import Concept from "@/models/Concept";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    try {
        const body = await req.json()
        const conceptData = body.formData // object of body sent w/ POST
        await Concept.create(conceptData)

        return new NextResponse("Concept successfully added", {status: 201})
    } catch(error) {
        return new NextResponse("ERROR: Failed to add concept" + error, {status: 500})
    }
}