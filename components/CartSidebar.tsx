"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function CartSidebar() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-cafe-700">
        <p>Your cart is empty.</p>
        <Link href="/" className="text-cafe-500 underline mt-2 inline-block">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.menuItemId} className="py-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-cafe-700">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label={`Decrease ${item.name}`}
                onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span data-testid={`qty-${item.menuItemId}`}>{item.quantity}</span>
              <button
                aria-label={`Increase ${item.name}`}
                onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
              <button
                aria-label={`Remove ${item.name}`}
                onClick={() => removeItem(item.menuItemId)}
                className="text-red-500 text-sm ml-2"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-4 font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Link
        href="/checkout"
        className="block text-center bg-cafe-500 text-white mt-4 py-2 rounded-md hover:bg-cafe-600 transition"
      >
        Proceed to checkout
      </Link>
    </div>
  );
}
