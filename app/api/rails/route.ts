import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

// GET ALL RAILS (only one GET allowed)
export async function GET() {
  await connectDB();
  const rails = await Rail.find().sort({ rail_pos: 1 }); // sorted
  return NextResponse.json(rails);
}

// CREATE NEW RAIL
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const sanitizedItems =
    (body.rail_items || []).map(item => {
      const cleaned = {};

      for (const key in item) {
        const val = item[key];

        // remove empty strings in image fields
        if (typeof val === "string" && val.trim() === "") continue;

        // remove empty image arrays
        if (Array.isArray(val) && val.length === 0) continue;

        cleaned[key] = val;
      }

      return cleaned;
    });

  const newRail = await Rail.create({
    rail_pos: Number(body.rail_pos),
    rail_name: body.rail_name,
    rail_items: sanitizedItems,
    orderIndex: 0
  });

  return NextResponse.json(newRail);
}



