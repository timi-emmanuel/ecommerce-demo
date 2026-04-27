"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { type Product } from "@/types/product";
import { type CartItem } from "@/features/cart/types";

const CART_STORAGE_KEY = "storecraft-cart";

type CartContextValue = {
  addItem: (product: Product, quantity?: number) => void;
  clearCart: () => void;
  hasHydrated: boolean;
  itemCount: number;
  items: CartItem[];
  removeItem: (productId: string) => void;
  subtotal: number;
  updateQuantity: (productId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function toCartItem(product: Product, quantity: number): CartItem {
  return {
    id: product.id,
    imageUrl: product.imageUrl,
    name: product.name,
    price: product.price,
    quantity,
    slug: product.slug,
    stock: product.stock,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (storedCart) {
          setItems(JSON.parse(storedCart) as CartItem[]);
        }
      } catch (error) {
        console.error("Failed to restore cart from localStorage:", error);
      } finally {
        setHasHydrated(true);
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hasHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      hasHydrated,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
      addItem(product, quantity = 1) {
        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.id === product.id);

          if (!existingItem) {
            return [...currentItems, toCartItem(product, Math.min(quantity, product.stock))];
          }

          return currentItems.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, product.stock),
                  stock: product.stock,
                }
              : item,
          );
        });
      },
      updateQuantity(productId, quantity) {
        setItems((currentItems) =>
          currentItems.flatMap((item) => {
            if (item.id !== productId) {
              return [item];
            }

            if (quantity <= 0) {
              return [];
            }

            return [
              {
                ...item,
                quantity: Math.min(quantity, item.stock),
              },
            ];
          }),
        );
      },
      removeItem(productId) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== productId),
        );
      },
      clearCart() {
        setItems([]);
      },
    };
  }, [hasHydrated, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
