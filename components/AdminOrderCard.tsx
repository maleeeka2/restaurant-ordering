"use client";

const NEXT_STATUS: Record<string, string | null> = {
  RECEIVED: "PREPARING",
  PREPARING: "READY",
  READY: "COMPLETED",
  COMPLETED: null,
};

export type AdminOrder = {
  id: string;
  customerName: string;
  tableNumber: string;
  instructions: string | null;
  status: string;
  createdAt: string;
  items: { id: string; quantity: number; priceSnapshot: number; menuItem: { name: string } }[];
};

export default function AdminOrderCard({
  order,
  onStatusChange,
}: {
  order: AdminOrder;
  onStatusChange: (orderId: string, status: string) => void;
}) {
  const next = NEXT_STATUS[order.status];

  return (
    <div className="bg-white rounded-lg shadow p-4" data-testid={`order-${order.id}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">
          {order.customerName} · Table {order.tableNumber}
        </h3>
        <span className="text-xs px-2 py-1 rounded-full bg-cafe-100 text-cafe-900">
          {order.status}
        </span>
      </div>
      <ul className="text-sm text-cafe-700 mb-2">
        {order.items.map((it) => (
          <li key={it.id}>
            {it.quantity}x {it.menuItem.name}
          </li>
        ))}
      </ul>
      {order.instructions && (
        <p className="text-xs italic text-cafe-700 mb-2">Note: {order.instructions}</p>
      )}
      {next && (
        <button
          onClick={() => onStatusChange(order.id, next)}
          className="text-sm bg-cafe-500 text-white px-3 py-1.5 rounded-md hover:bg-cafe-600 transition"
        >
          Mark as {next}
        </button>
      )}
    </div>
  );
}
