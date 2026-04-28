import { redirect } from "next/navigation";

import { verifyAdminSession } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminCheck = await verifyAdminSession();

  if (!adminCheck.ok) {
    redirect("/auth/sign-in?next=/admin/products");
  }

  return children;
}
