import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CartProvider } from "@/features/cart/context/CartProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="app-surface min-h-full text-foreground">
        <CartProvider>
          <div className="min-h-screen">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
