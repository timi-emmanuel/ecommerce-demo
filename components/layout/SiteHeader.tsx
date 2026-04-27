"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Store } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/features/cart/context/CartProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/admin/products", label: "Admin" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { hasHydrated, itemCount } = useCart();

  function isActiveLink(href: string) {
    if (href === "/") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Store className="size-5 text-primary" />
          <span className="font-semibold tracking-tight">StoreCraft</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                isActiveLink(link.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/cart"
          className={cn(
            buttonVariants({ size: "sm", variant: isActiveLink("/cart") ? "default" : "outline" }),
            "relative",
          )}
        >
          <ShoppingCart className="size-4" />
          Cart
          {hasHydrated && itemCount > 0 ? (
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-semibold leading-5 text-background">
              {itemCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
