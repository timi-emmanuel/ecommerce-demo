import { getSupabaseEnv } from "@/lib/supabase/config";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { mockProducts } from "@/features/products/mocks/products";
import { type Product } from "@/types/product";
import { type Database } from "@/types/database";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as Product["category"],
    description: row.description,
    price: row.price,
    rating: row.rating,
    reviewCount: row.review_count,
    stock: row.stock,
    imageUrl: row.image_url,
  };
}

function getMockProductBySlug(slug: string) {
  return mockProducts.find((product) => product.slug === slug) ?? null;
}

export async function getProducts() {
  const env = getSupabaseEnv();
  const supabase = createSupabasePublicClient();

  if (!supabase || !env) {
    return {
      products: mockProducts,
      source: "mock" as const,
      fallbackReason:
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
    };
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, category, description, price, rating, review_count, stock, image_url",
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load products from Supabase:", error.message);

    return {
      products: mockProducts,
      source: "mock" as const,
      fallbackReason: error.message,
    };
  }

  return {
    products: data.map(mapProduct),
    source: "supabase" as const,
    fallbackReason: null,
  };
}

export async function getProductBySlug(slug: string) {
  const env = getSupabaseEnv();
  const supabase = createSupabasePublicClient();

  if (!supabase || !env) {
    return {
      product: getMockProductBySlug(slug),
      source: "mock" as const,
      fallbackReason:
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
    };
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, category, description, price, rating, review_count, stock, image_url",
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to load product from Supabase:", error.message);

    return {
      product: getMockProductBySlug(slug),
      source: "mock" as const,
      fallbackReason: error.message,
    };
  }

  return {
    product: data ? mapProduct(data) : null,
    source: "supabase" as const,
    fallbackReason: null,
  };
}
