import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

export async function POST(req, { params }) {
  await connectDB();
  const body = await req.json(); // item object
  const rail = await Rail.findById(params.id);
  if (!rail) return NextResponse.json({ error: "rail not found" }, { status: 404 });

  rail.rail_items.push(body);
  await rail.save();
  return NextResponse.json(rail);
}
