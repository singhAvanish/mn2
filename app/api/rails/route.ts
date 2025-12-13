import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

/* ----------------------------
   TypeScript-safe Mongoose model
----------------------------- */
const RailModel = Rail as unknown as {
  find: (query?: any) => Promise<any[]>;
  findById: (id: string) => Promise<any>;
  create: (data: any) => Promise<any>;
};

/* --------------------------------------
   GET — Fetch all rails
   (validated by Next.js route checker)
--------------------------------------- */
export async function GET() {
  await connectDB();

  const rails = await RailModel.find({}).then((res) =>
    // Avoid TS issue when `.sort()` is chained
    res.sort((a, b) => Number(a.rail_pos) - Number(b.rail_pos))
  );

  return NextResponse.json(rails);
}

/* --------------------------------------
   POST — Create new rail
--------------------------------------- */
export async function POST(req: Request) {
  await connectDB();

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  /* Sanitize Items (remove empty strings / arrays) */
  const sanitizedItems = (body.rail_items || []).map(
    (item: Record<string, any>) => {
      const clean: Record<string, any> = {};

      for (const [key, val] of Object.entries(item)) {
        if (typeof val === "string" && !val.trim()) continue;
        if (Array.isArray(val) && val.length === 0) continue;
        clean[key] = val;
      }

      return clean;
    }
  );

  const newRail = await RailModel.create({
    rail_pos: Number(body.rail_pos),
    rail_name: body.rail_name,
    rail_items: sanitizedItems,
    orderIndex: 0,
  });

  return NextResponse.json(newRail);
}
