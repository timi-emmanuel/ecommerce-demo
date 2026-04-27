import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AddToCartButton } from "@/features/cart/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const isOutOfStock = product.stock <= 0;

  return (
    <Card className="group overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm">
      <div className="relative h-52 overflow-hidden">
        <ProductCardImage
          src={product.imageUrl}
          alt={product.name}
          loading={imageLoading}
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline">{product.category}</Badge>
          <span className="text-xs text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold tracking-tight text-foreground">
          {naira.format(product.price)}
        </p>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <span
          className={`text-xs font-medium ${isOutOfStock ? "text-destructive" : "text-muted-foreground"}`}
        >
          {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            View
          </Link>
          <AddToCartButton product={product} size="sm" />
        </div>
      </CardFooter>
    </Card>
  );
}
