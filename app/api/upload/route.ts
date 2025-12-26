// import { NextResponse } from "next/server";
// import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Convert file to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Upload using upload_stream with proper TS typing
//     const uploaded: UploadApiResponse = await new Promise(
//       (resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "rails" },
//           (error: UploadApiErrorResponse | null, result: UploadApiResponse | undefined) => {
//             if (error) return reject(error);
//             if (!result) return reject(new Error("Upload failed — empty result"));
//             resolve(result);
//           }
//         );
//         stream.end(buffer);
//       }
//     );

//     return NextResponse.json({
//       url: uploaded.secure_url,
//     });
//   } catch (error: any) {
//     console.error("UPLOAD ERROR:", error);
//     return NextResponse.json(
//       { error: error?.message || "Upload failed" },
//       { status: 500 }
//     );
//   }
// }


export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "rails" }, (err, res) => {
        if (err) reject(err);
        resolve(res);
      }).end(buffer);
    });

    return NextResponse.json({ url: uploaded.secure_url });
  } catch (err) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
