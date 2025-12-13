// lib/uploadToCloudinary.ts
import { v2 as cloudinary } from "cloudinary";

export async function uploadImageToCloud(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data?.url || null;
}

// ✅ FIXED MULTIPLE IMAGE UPLOADER
export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  if (!files?.length) return [];

  const uploadedUrls: string[] = [];

  for (const file of files) {
    try {
      const url = await uploadImageToCloud(file);
      if (url) uploadedUrls.push(url);
    } catch (err) {
      console.error("Failed to upload file:", err);
    }
  }

  console.log("Uploaded multiple URLs:", uploadedUrls);
  return uploadedUrls;
}
