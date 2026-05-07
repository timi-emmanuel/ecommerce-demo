"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Tag, Trash2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/features/cart/context/CartProvider";
import { cn } from "@/lib/utils";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function CartPageContent() {
  const { hasHydrated, items, removeItem, subtotal, updateQuantity } = useCart();

  if (!hasHydrated) {
    return <div className="h-56 animate-pulse rounded-3xl bg-[#e6e6e6]" />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-white p-8 text-center">
        <h1 className="text-4xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add products from catalog to continue.</p>
        <div className="mt-5">
          <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/">Home</Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground">Cart</span>
      </div>

      <h1 className="text-4xl font-bold uppercase tracking-tight sm:text-5xl">Your Cart</h1>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-3 rounded-3xl border border-border bg-[#f5f5f5] p-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl bg-white p-4">
              <div className="flex gap-3">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-[#ededed]">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/products/${item.slug}`} className="line-clamp-1 text-xl font-semibold tracking-tight sm:text-2xl">
                      {item.name}
                    </Link>
                    <button onClick={() => removeItem(item.id)} className="text-red-500">
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Stock: {item.stock}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-3xl font-bold">{naira.format(item.price)}</p>
                    <div className="flex h-10 items-center rounded-full bg-[#ededed] px-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="rounded-3xl border border-border bg-[#f5f5f5] p-5">
          <h2 className="text-3xl font-bold tracking-tight">Order Summary</h2>
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-semibold text-foreground">{naira.format(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Discount</span>
              <span className="font-semibold text-red-500">-20%</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span className="font-semibold text-foreground">{naira.format(15000)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-lg font-medium">Total</span>
              <span className="text-3xl font-bold">{naira.format(Math.max(subtotal * 0.8 + 15000, 0))}</span>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <div className="flex h-11 flex-1 items-center gap-2 rounded-full bg-[#e8e8e8] px-3 text-sm text-muted-foreground">
              <Tag className="size-4" />
              Add promo code
            </div>
            <button className="h-11 rounded-full bg-black px-5 text-white">Apply</button>
          </div>
          <Link
            href="/checkout"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-4 w-full rounded-full bg-black text-white",
            )}
          >
            Go to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
