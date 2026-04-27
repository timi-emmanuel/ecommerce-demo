"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/context/CartProvider";
import { type Product } from "@/types/product";

type AddToCartButtonProps = {
  className?: string;
  product: Product;
  redirectTo?: "/cart" | "/checkout";
  size?: React.ComponentProps<typeof Button>["size"];
  variant?: React.ComponentProps<typeof Button>["variant"];
};

export function AddToCartButton({
  className,
  product,
  redirectTo,
  size = "default",
  variant = "default",
}: AddToCartButtonProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [didAdd, setDidAdd] = useState(false);

  const isOutOfStock = product.stock <= 0;

  function handleClick() {
    if (isOutOfStock) {
      return;
    }

    addItem(product);
    setDidAdd(true);

    window.setTimeout(() => {
      setDidAdd(false);
    }, 1400);

    if (redirectTo) {
      startTransition(() => {
        router.push(redirectTo);
      });
    }
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      disabled={isOutOfStock}
      onClick={handleClick}
    >
      {didAdd ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
      {isOutOfStock ? "Unavailable" : didAdd ? "Added" : "Add to Cart"}
    </Button>
  );
}
