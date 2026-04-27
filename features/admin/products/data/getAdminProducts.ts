import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mockProducts } from "@/features/products/mocks/products";
import { type AdminProduct } from "@/features/admin/products/types";
import { type Database } from "@/types/database";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

function mapAdminProduct(row: ProductRow): AdminProduct {
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

export async function getAdminProducts() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      products: mockProducts.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        isActive: true,
        createdAt: new Date().toISOString(),
      })),
      source: "mock" as const,
      fallbackReason:
        "Missing NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    };
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, category, price, stock, image_url, is_active, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load admin products from Supabase:", error.message);

    return {
      products: [] as AdminProduct[],
      source: "supabase" as const,
      fallbackReason: error.message,
    };
  }

  return {
    products: data.map(mapAdminProduct),
    source: "supabase" as const,
    fallbackReason: null,
  };
}
