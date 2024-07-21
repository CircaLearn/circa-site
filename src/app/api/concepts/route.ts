// supports getting, creating, and updating concepts

import Concept from "@/models/Concept";
import connect from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect(); // Ensure database is connected before database ops
    const body = await req.json();
    const conceptData = body.formData; // object of body sent w/ POST
    const existing = await Concept.findOne(conceptData)
    // can't add records with the same name & usage
    if (!existing) {
      await Concept.create(conceptData);
    }
    return new NextResponse("Concept successfully added", { status: 201 });
  } catch (error) {
    return new NextResponse("ERROR: Failed to add concept " + error, {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connect();
    const concepts = await Concept.find();
    return NextResponse.json(concepts);
  } catch (error) {
    return new NextResponse("ERROR: Failed to fetch concepts " + error, {
      status: 500,
    });
  }
}