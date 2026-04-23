import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;

  return (
    <Card className="group overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
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
          {naira.format(product.price * 1500)}
        </p>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <span
          className={`text-xs font-medium ${isOutOfStock ? "text-destructive" : "text-muted-foreground"}`}
        >
          {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
        </span>
        <Link href={`/products/${product.slug}`}>
          <Button size="sm" variant={isOutOfStock ? "outline" : "default"}>
            {isOutOfStock ? "View Details" : "Add to Cart"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
