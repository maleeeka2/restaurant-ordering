"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="bg-cafe-700 text-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          🍕 The Cafe
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Menu
          </Link>
          <Link href="/cart" className="hover:underline relative">
            Cart
            {count > 0 && (
              <span className="ml-1 bg-cafe-100 text-cafe-900 rounded-full px-2 py-0.5 text-xs font-semibold">
                {count}
              </span>
            )}
          </Link>
          <Link href="/admin/login" className="hover:underline text-cafe-100">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
