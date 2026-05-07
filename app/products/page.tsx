import { ChevronRight, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";

import { ProductCardImage } from "@/features/products/components/ProductCardImage";
import { getProducts } from "@/features/products/data/getProducts";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export default async function ProductsPage() {
  const { products } = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/">Home</Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground">Casual</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        <aside className="hidden rounded-3xl border border-border/80 bg-[#f5f5f5] p-5 lg:block">
          <h2 className="text-2xl font-bold">Filters</h2>
          <div className="mt-5 space-y-6 text-muted-foreground">
            <p>T-shirts</p>
            <p>Shorts</p>
            <p>Shirts</p>
            <p>Hoodie</p>
            <p>Jeans</p>
          </div>
          <button className="mt-8 h-12 w-full rounded-full bg-black text-white">
            Apply Filter
          </button>
        </aside>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight">Casual</h1>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm lg:hidden">
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <article key={product.id}>
                <div className="relative h-[250px] overflow-hidden rounded-[20px] bg-[#ebebeb]">
                  <ProductCardImage
                    src={product.imageUrl}
                    alt={product.name}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <h3 className="mt-3 line-clamp-1 text-2xl font-semibold tracking-tight">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">
                    {product.rating.toFixed(1)}/5
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-3xl font-bold">{naira.format(product.price)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
