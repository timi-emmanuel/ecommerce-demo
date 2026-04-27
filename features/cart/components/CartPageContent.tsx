"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/features/cart/context/CartProvider";
import { cn } from "@/lib/utils";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function CartPageContent() {
  const {
    clearCart,
    hasHydrated,
    itemCount,
    items,
    removeItem,
    subtotal,
    updateQuantity,
  } = useCart();

  if (!hasHydrated) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <div className="h-8 w-28 animate-pulse rounded bg-muted/80" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl bg-muted/70"
              />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <div className="h-8 w-36 animate-pulse rounded bg-muted/80" />
          <div className="mt-6 h-28 animate-pulse rounded-2xl bg-muted/70" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-border/60 bg-card/75 p-10 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag className="size-7" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Your cart is empty
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Start with the product catalog, add a few items, then come back here to
          review quantities and pricing before checkout.
        </p>
        <div className="mt-8">
          <Link href="/products" className={buttonVariants({ size: "lg" })}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Cart
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Review your items
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {itemCount} item{itemCount === 1 ? "" : "s"} currently in your cart.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden border-border/60 bg-card/75">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="relative h-24 overflow-hidden rounded-2xl sm:w-28">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {naira.format(item.price)} each
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.stock} available in stock
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-border/70 bg-background/80">
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-full text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-10 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-full text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  <div className="w-24 text-right text-sm font-semibold text-foreground">
                    {naira.format(item.price * item.quantity)}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <aside className="space-y-4">
          <Card className="border-border/60 bg-card/75">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Order Summary</CardTitle>
              <button
                type="button"
                className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{naira.format(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-border/70 pt-4">
                <div className="flex items-center justify-between text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>{naira.format(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  Continue to Checkout
                </Link>
                <Link
                  href="/products"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "w-full",
                  )}
                >
                  Add More Products
                </Link>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
