"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type AdminProduct } from "@/features/admin/products/types";

type AdminProductManagerProps = {
  fallbackReason: string | null;
  initialProducts: AdminProduct[];
  source: "mock" | "supabase";
};

type FormState = {
  category: string;
  description: string;
  image: File | null;
  name: string;
  price: string;
  slug: string;
  stock: string;
};

const initialFormState: FormState = {
  name: "",
  slug: "",
  category: "",
  description: "",
  price: "",
  stock: "",
  image: null,
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function AdminProductManager({
  fallbackReason,
  initialProducts,
  source,
}: AdminProductManagerProps) {
  const [products, setProducts] = useState(initialProducts);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [busyProductId, setBusyProductId] = useState<string | null>(null);

  function handleTextChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setFormState((current) => ({
      ...current,
      image: file,
    }));

    setImagePreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return file ? URL.createObjectURL(file) : null;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (!formState.image) {
        throw new Error("Select a product image before submitting.");
      }

      const uploadFormData = new FormData();
      uploadFormData.append("file", formState.image);
      uploadFormData.append("slug", formState.slug || formState.name);

      const uploadResponse = await fetch("/api/admin/uploads", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadResult = (await uploadResponse.json()) as
        | { error?: string; secureUrl?: string }
        | undefined;

      if (!uploadResponse.ok || !uploadResult?.secureUrl) {
        throw new Error(uploadResult?.error || "Image upload failed.");
      }

      imageUrl = uploadResult.secureUrl;

      const productResponse = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          slug: formState.slug,
          category: formState.category,
          description: formState.description,
          price: Number(formState.price),
          stock: Number(formState.stock),
          imageUrl,
        }),
      });

      const productResult = (await productResponse.json()) as
        | { error?: string; product?: AdminProduct }
        | undefined;

      if (!productResponse.ok || !productResult?.product) {
        throw new Error(productResult?.error || "Product creation failed.");
      }

      setProducts((current) => [productResult.product, ...current]);
      setFormState(initialFormState);
      setSuccessMessage("Product created successfully.");
      setImagePreviewUrl((current) => {
        if (current) {
          URL.revokeObjectURL(current);
        }

        return null;
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create product.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleActive(product: AdminProduct) {
    setErrorMessage(null);
    setSuccessMessage(null);
    setBusyProductId(product.id);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !product.isActive }),
      });

      const result = (await response.json()) as
        | { error?: string; product?: AdminProduct }
        | undefined;

      if (!response.ok || !result?.product) {
        throw new Error(result?.error || "Failed to update product.");
      }

      setProducts((current) =>
        current.map((entry) => (entry.id === result.product?.id ? result.product : entry)),
      );
      setSuccessMessage(
        `Product ${result.product.isActive ? "activated" : "deactivated"} successfully.`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update product.",
      );
    } finally {
      setBusyProductId(null);
    }
  }

  async function handleDelete(product: AdminProduct) {
    const confirmed = window.confirm(`Delete "${product.name}"? This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setBusyProductId(product.id);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as { error?: string } | undefined;

      if (!response.ok) {
        throw new Error(result?.error || "Failed to delete product.");
      }

      setProducts((current) => current.filter((entry) => entry.id !== product.id));
      setSuccessMessage("Product deleted successfully.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to delete product.",
      );
    } finally {
      setBusyProductId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Manage products
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Create products with Cloudinary-backed images and persist them directly
          to the catalog.
        </p>
        {source === "mock" && fallbackReason ? (
          <div className="mt-4 rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Admin fallback reason: {fallbackReason}
          </div>
        ) : null}
        {source === "supabase" && fallbackReason ? (
          <div className="mt-4 rounded-xl border border-red-300/60 bg-red-50 px-4 py-3 text-sm text-red-900">
            Admin data warning: {fallbackReason}
          </div>
        ) : null}
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-border/60 bg-card/75">
          <CardHeader>
            <CardTitle>Create product</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="name">
                    Product name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleTextChange}
                    placeholder="ErgoRise Office Chair"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="slug">
                    Slug
                  </label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formState.slug}
                    onChange={handleTextChange}
                    placeholder="ergorise-office-chair"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="category">
                    Category
                  </label>
                  <Input
                    id="category"
                    name="category"
                    value={formState.category}
                    onChange={handleTextChange}
                    placeholder="Home Office"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="stock">
                    Stock
                  </label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formState.stock}
                    onChange={handleTextChange}
                    placeholder="12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="price">
                  Price (NGN)
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  value={formState.price}
                  onChange={handleTextChange}
                  placeholder="249500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleTextChange}
                  placeholder="Describe the product clearly for shoppers."
                  required
                  className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 ring-offset-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="image">
                  Product image
                </label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>

              {imagePreviewUrl ? (
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-3">
                  <div className="relative h-52 overflow-hidden rounded-xl">
                    <Image
                      src={imagePreviewUrl}
                      alt="Selected product preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 420px"
                      unoptimized
                    />
                  </div>
                </div>
              ) : null}

              {errorMessage ? (
                <div className="rounded-xl border border-red-300/60 bg-red-50 px-4 py-3 text-sm text-red-900">
                  {errorMessage}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-xl border border-emerald-300/60 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  {successMessage}
                </div>
              ) : null}

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Creating Product..." : "Create Product"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/75">
          <CardHeader>
            <CardTitle>Current products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground">
                No products found yet.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-background/70 p-4 sm:flex-row"
                >
                  <div className="relative h-24 overflow-hidden rounded-xl sm:w-28">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {product.category}
                      </span>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div>
                      <p className="text-base font-semibold tracking-tight text-foreground">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{product.slug}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>{naira.format(product.price)}</span>
                      <span>{product.stock} in stock</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={busyProductId === product.id}
                        onClick={() => handleToggleActive(product)}
                      >
                        {product.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={busyProductId === product.id}
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
