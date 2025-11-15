import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";
import { NextResponse } from "next/server";

export async function DELETE() {
  await connectDB();
  await Rail.deleteMany({});
  return NextResponse.json({ success: true });
}
