import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all updates
export async function GET() {
  try {
    const updates = await prisma.update.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(updates, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching updates:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST new update
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const update = await prisma.update.create({
      data: {
        title: body.title,
        description: body.description,
        note: body.note || null,
      },
    });

    return NextResponse.json(update, { status: 201 });
  } catch (err) {
    console.error("❌ Error saving update:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
