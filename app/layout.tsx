import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "The Cafe | Order Online",
  description: "Browse our menu and order online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-cafe-900">
        <CartProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
