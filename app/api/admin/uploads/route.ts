import { NextResponse } from "next/server";

import { uploadProductImage } from "@/lib/cloudinary";

function sanitizePublicId(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const slug = formData.get("slug");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = file.type || "image/jpeg";
    const dataUri = `data:${mimeType};base64,${base64}`;
    const baseId =
      typeof slug === "string" && slug.length > 0
        ? sanitizePublicId(slug)
        : `product-${Date.now()}`;

    const result = await uploadProductImage(dataUri, `${baseId}-${Date.now()}`);

    return NextResponse.json({
      publicId: result.public_id,
      secureUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Failed to upload image to Cloudinary:", error);

    return NextResponse.json(
      { error: "Failed to upload image." },
      { status: 500 },
    );
  }
}
