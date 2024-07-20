// pages/api/add-concept.ts
import Concept from "@/models/Concept";
import connect from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect(); // Ensure database is connected before database ops
    const body = await req.json();
    const conceptData = body.formData; // object of body sent w/ POST
    await Concept.create(conceptData);

    return new NextResponse("Concept successfully added", { status: 201 });
  } catch (error) {
    return new NextResponse("ERROR: Failed to add concept " + error, {
      status: 500,
    });
  }
}
