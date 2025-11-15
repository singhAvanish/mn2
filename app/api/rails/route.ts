import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

export async function GET() {
  await connectDB();
  const rails = await Rail.find().sort({ orderIndex: 1 });

  return NextResponse.json(rails);
  


}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const rail_pos = Number(body.rail_pos);
  if (!rail_pos) return NextResponse.json({ error: "rail_pos required" }, { status: 400 });
  if (!body.rail_name) return NextResponse.json({ error: "rail_name required" }, { status: 400 });
    console.log("== BODY RECEIVED ==");
  console.log(body);
  console.log("== rail_items ==");
console.log(body.rail_items);


  const newRail = await Rail.create({
    rail_pos,
    rail_name: body.rail_name,
    rail_items: Array.isArray(body.rail_items) ? body.rail_items : [],
    orderIndex: body.orderIndex ?? 0,
  });




  return NextResponse.json(newRail);

}
