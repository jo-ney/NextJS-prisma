import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
    try {
      // Fetch all food entries, ordered by newest first
      const entries = await prisma.foodEntry.findMany({
        orderBy: { createdAt: "desc" },
      });
  
      return NextResponse.json(entries, { status: 200 });
    } catch (err) {
      console.error("❌ Error fetching food entries:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Incoming body:", body);

    // Basic validation & type conversion
    const { session, food, weight, description } = body;
    if (!food || !weight) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newFood = await prisma.foodEntry.create({
        data: {
            session,
            foodName: food,   // note the column name change
            weight: Number(weight),
            description,
          },
    });

    return NextResponse.json(newFood, { status: 201 });
  } catch (err) {
    console.error("❌ Error saving food:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
