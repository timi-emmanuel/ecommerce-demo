"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/features/cart/context/CartProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/admin/products", label: "Admin" },
];

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { hasHydrated, itemCount } = useCart();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (!hasSupabaseEnv()) {
      return;
    }

    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsSignedIn(Boolean(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session?.user));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    if (!hasSupabaseEnv()) {
      return;
    }

    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  function isActiveLink(href: string) {
    if (href === "/") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white">
      <div className="bg-black px-4 py-2 text-center text-[11px] text-white sm:text-xs">
        Sign up and get 20% off to your first order.{" "}
        <span className="underline cursor-pointer">Sign Up Now</span>
      </div>
      <div className="mx-auto flex h-16 w-full  items-center justify-between px-20 ">
        <div className="flex items-center gap-3">
          <button type="button" className="inline-flex md:hidden">
            <Menu className="size-6" />
          </button>
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl font-bold tracking-tight sm:text-[32px]">SHOP.CO</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-4 md:flex px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                " text-sm font-medium transition-colors",
                isActiveLink(link.href)
                  ? "bg-black text-white"
                  : "text-foreground/80 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden flex-1  md:block">
          <div className="flex  w-full items-center gap-3 rounded-full bg-[#F0F0F0] px-4 py-3">
            <Search className="size-5 text-muted-foreground" />
            <input
              placeholder="Search for products..."
              className="w-full bg-transparent text-xs outline-none sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="inline-flex md:hidden">
            <Search className="size-5" />
          </button>
          {isSignedIn ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          ) : (
            <Link
              href="/auth/sign-in"
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Sign in
            </Link>
          )}
          <Link
            href="/cart"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: isActiveLink("/cart") ? "default" : "ghost",
              }),
              "relative rounded-full",
            )}
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Cart</span>
            {hasHydrated && itemCount > 0 ? (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-semibold leading-5 text-background">
                {itemCount}
              </span>
            ) : null}
          </Link>
          <button type="button" className="inline-flex size-9 items-center justify-center rounded-full">
            <CircleUserRound className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
