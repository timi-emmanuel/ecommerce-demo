import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-8 py-8 sm:py-12">
      <section className="rounded-2xl border border-border/60 bg-card/70 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        <Badge className="mb-4 gap-1" variant="secondary">
          <Sparkles className="size-3.5" />
          UI-First Bootstrap
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Growth-stage e-commerce demo, built screen-first with shadcn/ui.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          This starter includes a reusable app shell, design tokens, and a
          polished products page backed by typed mock data.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products">
            <Button size="lg">
              Explore Products
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button size="lg" variant="outline">
              Preview Admin Flow
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Storefront", "Checkout", "Admin"].map((pillar) => (
          <Card key={pillar} className="bg-card/65">
            <CardHeader>
              <CardTitle>{pillar}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {pillar === "Storefront" &&
                "Product discovery, search/filtering, and variant-ready presentation."}
              {pillar === "Checkout" &&
                "Cart and payment UI flow ready to wire with Paystack and Supabase."}
              {pillar === "Admin" &&
                "Operational screens for product updates and order state management."}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
