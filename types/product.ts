export type ProductCategory =
  | "Audio"
  | "Wearables"
  | "Home Office"
  | "Accessories"
  | "Fashion";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  stock: number;
  imageUrl: string;
};
