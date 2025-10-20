// app/api/expense/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

// GET all expenses
export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(expenses, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

// POST new expense
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const expense = await prisma.expense.create({
      data: {
        dateTime: new Date(body.dateTime),
        itemName: body.itemName,
        capacity: Number(body.capacity),
        unit: body.unit,
        itemPrice: Number(body.itemPrice),
        actualPrice: Number(body.actualPrice),
        description: body.description || null,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (err) {
    console.error("❌ Error saving expense:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
