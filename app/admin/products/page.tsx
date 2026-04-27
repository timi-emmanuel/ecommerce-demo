export const dynamic = "force-dynamic";

import { AdminProductManager } from "@/features/admin/products/components/AdminProductManager";
import { getAdminProducts } from "@/features/admin/products/data/getAdminProducts";

export default async function AdminProductsPage() {
  const { products, source, fallbackReason } = await getAdminProducts();

  return (
    <AdminProductManager
      initialProducts={products}
      source={source}
      fallbackReason={fallbackReason}
    />
  );
}
