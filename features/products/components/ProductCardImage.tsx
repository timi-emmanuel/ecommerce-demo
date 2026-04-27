"use client";

import { useState } from "react";
import Image from "next/image";

type ProductCardImageProps = {
  alt: string;
  loading?: "eager" | "lazy";
  src: string;
};

export function ProductCardImage({
  alt,
  loading = "lazy",
  src,
}: ProductCardImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div
        className={`absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.06),rgba(255,255,255,0.22),rgba(255,255,255,0.06))] bg-[length:200%_100%] transition-opacity duration-300 ${isLoading ? "animate-pulse opacity-100" : "opacity-0"}`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        loading={loading}
        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${isLoading ? "scale-[1.02] blur-sm" : "blur-0"}`}
        sizes="(max-width: 1024px) 100vw, 33vw"
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}
