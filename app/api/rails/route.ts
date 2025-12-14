export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

/* FIX mongoose typing safely */
const RailModel = Rail as any;

/* --------------------
   GET ALL RAILS
--------------------- */
export async function GET() {
  await connectDB();

  // FIX: await THEN sort — proper typing
  const rails = await RailModel.find({}).sort({ rail_pos: 1 });

  return NextResponse.json(rails);
}

/* --------------------
   CREATE RAIL
--------------------- */
export async function POST(req: Request) {
  await connectDB();

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // sanitize
  const sanitizedItems = (body.rail_items || []).map((item: any) => {
    const clean: any = {};
    for (const key in item) {
      const v = item[key];
      if (typeof v === "string" && !v.trim()) continue;
      if (Array.isArray(v) && v.length === 0) continue;
      clean[key] = v;
    }
    return clean;
  });

  const created = await RailModel.create({
    rail_pos: Number(body.rail_pos),
    rail_name: body.rail_name,
    rail_items: sanitizedItems,
  });

  return NextResponse.json(created);
}
