import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Star, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AddToCartButton } from "@/features/cart/components/AddToCartButton";
import { ProductCardImage } from "@/features/products/components/ProductCardImage";
import { getProductBySlug, getProducts } from "@/features/products/data/getProducts";
import { cn } from "@/lib/utils";

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

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const { product, source, fallbackReason } = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link href="/products" className="transition-colors hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/75 p-4 shadow-sm">
          <div className="relative h-[22rem] overflow-hidden rounded-2xl sm:h-[30rem]">
            <ProductCardImage
              src={product.imageUrl}
              alt={product.name}
              loading="eager"
            />
          </div>
        </div>

        <div className="space-y-5 rounded-3xl border border-border/60 bg-card/75 p-6 shadow-sm">
          <div className="space-y-3">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-current text-amber-500" />
                {product.rating.toFixed(1)} rating
              </span>
              <span>{product.reviewCount} reviews</span>
              <span>{isOutOfStock ? "Out of stock" : `${product.stock} in stock`}</span>
            </div>
          </div>

          <p className="text-3xl font-bold tracking-tight text-foreground">
            {naira.format(product.price)}
          </p>

          <p className="text-base leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="grid gap-3 rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-primary" />
              <span>Starter-ready product detail UI with live data support.</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="size-4 text-primary" />
              <span>Delivery rules stay customizable per client project.</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <AddToCartButton product={product} size="lg" redirectTo="/cart" />
            <Link href="/checkout">
              <span
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                )}
              >
                Buy Now
              </span>
            </Link>
          </div>

          {source === "mock" && fallbackReason ? (
            <div className="rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              Product fallback reason: {fallbackReason}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
