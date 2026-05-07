import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CartProvider } from "@/features/cart/context/CartProvider";

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-structure",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-emotion",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StoreCraft | E-Commerce Demo",
  description: "UI-first growth-stage e-commerce demo built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="app-surface min-h-full text-foreground">
        <CartProvider>
          <div className="min-h-screen bg-white">
            <SiteHeader />
            <main className="w-full">{children}</main>
            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
