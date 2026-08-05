"use client";

import { useEffect, useState } from "react";
import OrderStatus from "@/components/OrderStatus";

type OrderDetail = {
  id: string;
  customerName: string;
  tableNumber: string;
  status: string;
  createdAt: string;
  items: { id: string; quantity: number; priceSnapshot: number; menuItem: { name: string } }[];
};

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${params.id}`);
        if (!res.ok) {
          if (active) setError("Order not found.");
          return;
        }
        const data = await res.json();
        if (active) setOrder(data.order);
      } catch {
        if (active) setError("Could not load order.");
      }
    }

    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [params.id]);

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!order) return <p className="text-center py-10">Loading order...</p>;

  const total = order.items.reduce((s, i) => s + i.priceSnapshot * i.quantity, 0);

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-1">Order #{order.id.slice(-6).toUpperCase()}</h1>
      <p className="text-cafe-700 mb-4">
        {order.customerName} · Table {order.tableNumber}
      </p>
      <div className="mb-6">
        <OrderStatus status={order.status} />
      </div>
      <ul className="divide-y mb-4">
        {order.items.map((it) => (
          <li key={it.id} className="py-2 flex justify-between text-sm">
            <span>
              {it.quantity}x {it.menuItem.name}
            </span>
            <span>${(it.priceSnapshot * it.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
