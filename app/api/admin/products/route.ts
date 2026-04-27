import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { type Database } from "@/types/database";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

function mapProduct(row: ProductRow) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    price: row.price,
    stock: row.stock,
    imageUrl: row.image_url,
    isActive: row.is_active,
    createdAt: row.created_at,
  };
}

function sanitizeSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseAdminClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase admin client is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
    const slugValue =
      typeof body.slug === "string" && body.slug.trim().length > 0
        ? body.slug
        : name;
    const slug = sanitizeSlug(slugValue);
    const price = Number(body.price);
    const stock = Number(body.stock);

    if (!name || !category || !description || !imageUrl || !slug) {
      return NextResponse.json(
        { error: "Name, slug, category, description, and image are required." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { error: "Price must be a valid non-negative number." },
        { status: 400 },
      );
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return NextResponse.json(
        { error: "Stock must be a valid non-negative integer." },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        slug,
        category,
        description,
        image_url: imageUrl,
        price,
        stock,
        is_active: true,
      })
      .select("id, name, slug, category, price, stock, image_url, is_active, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ product: mapProduct(data) }, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin product:", error);

    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 },
    );
  }
}
