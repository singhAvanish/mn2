

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Rail from "@/lib/models/Rail";

// // Fix mongoose typing
// const RailModel = Rail as unknown as {
//   findById: (id: any) => Promise<any>;
//   findByIdAndUpdate: (id: any, update: any, options: any) => Promise<any>;
//   findByIdAndDelete: (id: any) => Promise<any>;
// };

// /* -----------------------------------------
//    GET — Fetch Single Rail by ID
// ------------------------------------------ */
// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   await connectDB();

//   const { id } = await params;

//   if (!id || id === "undefined") {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   const rail = await RailModel.findById(id);

//   if (!rail) {
//     return NextResponse.json({ error: "not found" }, { status: 404 });
//   }

//   return NextResponse.json(rail);
// }

// /* -----------------------------------------
//    PUT — Update Rail by ID
// ------------------------------------------ */
// export async function PUT(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   await connectDB();

//   const { id } = await params;

//   if (!id || id === "undefined") {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   let body: any;
//   try {
//     body = await req.json();
//   } catch {
//     return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
//   }

//   // SANITIZE ITEMS
//   const sanitizedItems = (body.rail_items || []).map((item: any) => {
//     const clean: any = {};

//     for (const key in item) {
//       const v = item[key];

//       if (typeof v === "string" && !v.trim()) continue;
//       if (Array.isArray(v) && v.length === 0) continue;

//       clean[key] = v;
//     }

//     return clean;
//   });

//   const updated = await RailModel.findByIdAndUpdate(
//     id,
//     {
//       rail_name: body.rail_name,
//       rail_items: sanitizedItems,
//     },
//     { new: true }
//   );

//   return NextResponse.json(updated);
// }

// /* -----------------------------------------
//    DELETE — Remove Rail by ID
// ------------------------------------------ */
// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   await connectDB();

//   const { id } = await params;

//   if (!id || id === "undefined") {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   await RailModel.findByIdAndDelete(id);

//   return NextResponse.json({ success: true });
// }

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Rail from "@/lib/models/Rail";

const RailModel = Rail as unknown as {
  findById: (id: any) => Promise<any>;
  findByIdAndUpdate: (id: any, update: any, opts: any) => Promise<any>;
  findByIdAndDelete: (id: any) => Promise<any>;
};

// GET one rail
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const rail = await RailModel.findById(id);
  if (!rail) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(rail);
}

// UPDATE rail
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

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

  const updated = await RailModel.findByIdAndUpdate(
    id,
    {
      rail_name: body.rail_name,
      rail_items: sanitizedItems,
    },
    { new: true }
  );

  return NextResponse.json(updated);
}

// DELETE rail
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  await RailModel.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
