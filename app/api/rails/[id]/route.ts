import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

export async function GET(_, { params }) {
  await connectDB();
  const rail = await Rail.findById(params.id);
  if (!rail) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(rail);
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await Rail.findByIdAndUpdate(
    params.id,
    { rail_name: body.rail_name ?? undefined, orderIndex: body.orderIndex ?? undefined, rail_items: body.rail_items ?? undefined },
    { new: true, omitUndefined: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Rail.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
