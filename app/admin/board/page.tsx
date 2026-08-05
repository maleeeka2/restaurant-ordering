"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminOrderCard, { AdminOrder } from "@/components/AdminOrderCard";

export default function AdminBoardPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    const res = await fetch("/api/admin/orders");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (!res.ok) {
      setError("Could not load orders.");
      return;
    }
    const data = await res.json();
    setOrders(data.orders || []);
    setError(null);
  }, [router]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  async function handleStatusChange(orderId: string, status: string) {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  }

  async function handleSeed() {
    setSeeding(true);
    await fetch("/api/seed", { method: "POST" });
    setSeeding(false);
  }

  const active = orders.filter((o) => o.status !== "COMPLETED");
  const completed = orders.filter((o) => o.status === "COMPLETED");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Order Board</h1>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="text-sm bg-cafe-700 text-white px-3 py-1.5 rounded-md hover:bg-cafe-900 transition"
        >
          {seeding ? "Seeding..." : "Seed sample menu"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <h2 className="font-semibold mb-2">Active orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {active.length === 0 && <p className="text-cafe-700">No active orders.</p>}
        {active.map((order) => (
          <AdminOrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
        ))}
      </div>
      <h2 className="font-semibold mb-2">Completed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {completed.map((order) => (
          <AdminOrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </div>
  );
}
