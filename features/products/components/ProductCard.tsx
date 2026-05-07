import Link from "next/link";
import { Star } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { AddToCartButton } from "@/features/cart/components/AddToCartButton";
import { ProductCardImage } from "@/features/products/components/ProductCardImage";
import { cn } from "@/lib/utils";
import { type Product } from "@/types/product";

type ProductCardProps = {
  imageLoading?: "eager" | "lazy";
  product: Product;
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function ProductCard({
  imageLoading = "lazy",
  product,
}: ProductCardProps) {
  return (
    <article className="group">
      <div className="relative h-52 overflow-hidden rounded-[16px] bg-[#ebebeb]">
        <ProductCardImage
          src={product.imageUrl}
          alt={product.name}
          loading={imageLoading}
        />
      </div>
      <h3 className="font-structure mt-2.5 line-clamp-1 text-xl font-semibold tracking-tight">{product.name}</h3>
      <div className="mt-1 flex items-center gap-1 text-amber-500">
        {Array.from({ length: 4 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">{product.rating.toFixed(1)}/5</span>
      </div>
      <p className="mt-1.5 text-3xl font-bold tracking-tight text-foreground">{naira.format(product.price)}</p>
      <div className="mt-3 flex items-center gap-2">
        <Link href={`/products/${product.slug}`} className={cn(buttonVariants({ size: "sm", variant: "outline" }), "rounded-full")}>
          View
        </Link>
        <AddToCartButton product={product} size="sm" className="rounded-full" />
      </div>
    </article>
  );
}
