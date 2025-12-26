import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

export async function PUT(req, context) {
  const params = await context.params;  // ⬅ FIXED
  await connectDB();

  const id = params.id;
  const idx = Number(params.index);
  const body = await req.json();
      const RailModel = Rail as unknown as {
    findById: (query: any) => Promise<any>;
    create: (data: any) => Promise<any>;
  };

  const rail = await RailModel.findById(id);
  if (!rail) return NextResponse.json({ error: "rail not found" }, { status: 404 });

  if (!Array.isArray(rail.rail_items) || idx < 0 || idx >= rail.rail_items.length) {
    return NextResponse.json({ error: "item index out of range" }, { status: 400 });
  }

  rail.rail_items[idx] = body;
  await rail.save();

  return NextResponse.json(rail);
}


export async function DELETE(req, context) {
  const params = await context.params;   // ⬅ FIXED
  await connectDB();

  const idx = Number(params.index);
  const id = params.id;
       const RailModel = Rail as unknown as {
    findById: (query: any) => Promise<any>;
    create: (data: any) => Promise<any>;
  };

  const rail = await RailModel.findById(id);
  if (!rail) {
    return NextResponse.json({ error: "rail not found" }, { status: 404 });
  }

  if (!Array.isArray(rail.rail_items) || idx < 0 || idx >= rail.rail_items.length) {
    return NextResponse.json({ error: "item index out of range" }, { status: 400 });
  }

  rail.rail_items.splice(idx, 1);
  await rail.save();

  return NextResponse.json({ success: true, rail });
}
