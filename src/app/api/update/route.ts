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


// export async function POST(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
    
//     // Sorting options
//     const sortBy = searchParams.get('sortBy') || 'createdAt';
//     const sortOrder = searchParams.get('sortOrder') || 'desc';
    
//     // Validate sort field
//     const validSortFields = ['createdAt', 'updatedAt', 'title', 'description', 'note'];
//     const orderByField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    
//     const updates = await prisma.update.findMany({
//       orderBy: {
//         [orderByField]: sortOrder === 'asc' ? 'asc' : 'desc'
//       },
//     });

//     return NextResponse.json(updates, { status: 200 });
    
//   } catch (error) {
//     console.error("❌ Error fetching updates:", error);
    
//     return NextResponse.json(
//       { error: "Failed to fetch updates" }, 
//       { status: 500 }
//     );
//   }
// }