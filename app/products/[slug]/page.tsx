import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Minus, Plus, SlidersHorizontal, Star } from "lucide-react";

import { AddToCartButton } from "@/features/cart/components/AddToCartButton";
import { ProductCardImage } from "@/features/products/components/ProductCardImage";
import { getProductBySlug, getProducts } from "@/features/products/data/getProducts";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export async function generateStaticParams() {
  const { products } = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const { product } = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/">Home</Link>
        <ChevronRight className="size-4" />
        <Link href="/products">Shop</Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative h-28 flex-1 overflow-hidden rounded-2xl border border-border bg-[#e8e8e8] sm:flex-none">
                <ProductCardImage src={product.imageUrl} alt={`${product.name} preview ${item}`} />
              </div>
            ))}
          </div>
          <div className="relative order-1 h-[380px] overflow-hidden rounded-3xl bg-[#e8e8e8] sm:order-2 lg:h-[420px]">
            <ProductCardImage src={product.imageUrl} alt={product.name} loading="eager" />
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl font-bold uppercase tracking-tight sm:text-5xl">{product.name}</h1>
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 4 }).map((_, i) => (
              <Star key={i} className="size-5 fill-current" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">{product.rating.toFixed(1)}/5</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold">{naira.format(product.price)}</p>
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-500">-20%</span>
          </div>
          <p className="border-b border-border pb-4 text-muted-foreground">{product.description}</p>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Choose Size</p>
            <div className="flex flex-wrap gap-2">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  className={`h-10 rounded-full px-5 text-sm ${size === "Large" ? "bg-black text-white" : "bg-[#e7e7e7] text-muted-foreground"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex h-12 items-center rounded-full bg-[#e7e7e7] px-3">
              <button className="px-2">
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm">1</span>
              <button className="px-2">
                <Plus className="size-4" />
              </button>
            </div>
            <AddToCartButton product={product} className="h-12 rounded-full px-10" />
          </div>
        </div>
      </section>

      <section className="space-y-4 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">All Reviews</h2>
          <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm text-white">
            <SlidersHorizontal className="size-4" />
            Write a Review
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {["Samantha D.", "Alex M.", "Ethan R.", "Olivia P."].map((name) => (
            <article key={name} className="rounded-2xl border border-border bg-white p-5">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-lg font-semibold">{name}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                This t-shirt exceeded my expectations. Great fit, quality, and comfort.
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
