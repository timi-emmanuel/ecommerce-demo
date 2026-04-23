import { SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/features/products/components/ProductCard";
import { mockProducts } from "@/features/products/mocks/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "All",
  ...Array.from(new Set(mockProducts.map((product) => product.category))),
];

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Storefront
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Browse products
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          UI-first version using mock data. Next step is wiring this screen to
          Supabase queries without changing the visual components.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-border/60 bg-card/65 p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Input
            placeholder="Search products..."
            className="bg-background/80 md:max-w-sm"
          />
          <Button variant="outline" className="md:w-auto">
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="rounded-md px-3 py-1"
            >
              {category}
            </Badge>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
