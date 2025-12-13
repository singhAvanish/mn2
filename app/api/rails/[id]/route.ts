import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

export async function GET(request, context) {
  const awaited = await context.params;
  await connectDB();

  const rail = await Rail.findById(awaited.id);
  if (!rail) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(rail);
}

export async function PUT(request, context) {
  const awaited = await context.params;
  const id = awaited.id;

  await connectDB();
  let body = {};

  // SAFELY parse JSON
  try {
    body = await request.json();
  } catch (err) {
    console.error("JSON parse failed", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // SANITIZE items
  const sanitizedItems = (body.rail_items || []).map((item) => {
    const clean = {};
    for (const key in item) {
      const val = item[key];
      if (typeof val === "string" && val.trim() === "") continue;
      if (Array.isArray(val) && val.length === 0) continue;
      clean[key] = val;
    }
    return clean;
  });

  console.log("SAVE TO DB:", sanitizedItems);

  const updated = await Rail.findByIdAndUpdate(
    id,
    {
      rail_name: body.rail_name,
      rail_items: sanitizedItems,
    },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(request, context) {
  const awaited = await context.params;
  const id = awaited.id;

  await connectDB();
  await Rail.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
