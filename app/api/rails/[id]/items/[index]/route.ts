import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

export async function PUT(req, { params }) {
  await connectDB();
  const idx = Number(params.index);
  const body = await req.json();
  const rail = await Rail.findById(params.id);
  if (!rail) return NextResponse.json({ error: "rail not found" }, { status: 404 });

  if (!Array.isArray(rail.rail_items) || idx < 0 || idx >= rail.rail_items.length) {
    return NextResponse.json({ error: "item index out of range" }, { status: 400 });
  }

  rail.rail_items[idx] = body;
  await rail.save();
  return NextResponse.json(rail);
}

export async function DELETE(_, { params }) {
  await connectDB();
  const idx = Number(params.index);
  const rail = await Rail.findById(params.id);
  if (!rail) return NextResponse.json({ error: "rail not found" }, { status: 404 });

  if (!Array.isArray(rail.rail_items) || idx < 0 || idx >= rail.rail_items.length) {
    return NextResponse.json({ error: "item index out of range" }, { status: 400 });
  }

  rail.rail_items.splice(idx, 1);
  await rail.save();
  return NextResponse.json({ success: true, rail });
}
