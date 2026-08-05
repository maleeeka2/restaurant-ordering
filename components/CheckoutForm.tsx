"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          tableNumber,
          instructions,
          items: items.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      clearCart();
      router.push(`/order/${data.order.id}`);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="tableNumber" className="block text-sm font-medium mb-1">
          Table number
        </label>
        <input
          id="tableNumber"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium mb-1">
          Special instructions (optional)
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
          rows={3}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex items-center justify-between font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        type="submit"
        disabled={submitting || items.length === 0}
        className="w-full bg-cafe-500 disabled:bg-gray-300 text-white py-2 rounded-md hover:bg-cafe-600 transition"
      >
        {submitting ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}
