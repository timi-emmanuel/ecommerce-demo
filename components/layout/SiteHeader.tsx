import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/admin/products", label: "Admin" },
];

export function SiteHeader() {
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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button size="sm" variant="outline">
          <ShoppingCart className="size-4" />
          Cart
        </Button>
      </div>
    </header>
  );
}
