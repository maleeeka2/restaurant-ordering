import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    menuItem: { findMany: vi.fn() },
    order: { create: vi.fn(), findUnique: vi.fn() },
  },
}));

import { prisma } from "@/lib/prisma";
import { POST } from "@/app/api/orders/route";
import { GET as getOrder } from "@/app/api/orders/[id]/route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/orders", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/orders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects an order with no items", async () => {
    const res = await POST(makeRequest({ customerName: "Alex", tableNumber: "4", items: [] }));
    expect(res.status).toBe(400);
  });

  it("rejects an order missing customer name", async () => {
    const res = await POST(
      makeRequest({ tableNumber: "4", items: [{ menuItemId: "m1", quantity: 1 }] })
    );
    expect(res.status).toBe(400);
  });

  it("rejects an order referencing an unknown menu item", async () => {
    (prisma.menuItem.findMany as any).mockResolvedValue([]);
    const res = await POST(
      makeRequest({
        customerName: "Alex",
        tableNumber: "4",
        items: [{ menuItemId: "unknown", quantity: 1 }],
      })
    );
    expect(res.status).toBe(400);
  });

  it("rejects an order for an unavailable item", async () => {
    (prisma.menuItem.findMany as any).mockResolvedValue([
      { id: "m1", name: "Margherita", price: 8.99, isAvailable: false },
    ]);
    const res = await POST(
      makeRequest({
        customerName: "Alex",
        tableNumber: "4",
        items: [{ menuItemId: "m1", quantity: 1 }],
      })
    );
    expect(res.status).toBe(400);
  });

  it("creates a valid order", async () => {
    (prisma.menuItem.findMany as any).mockResolvedValue([
      { id: "m1", name: "Margherita", price: 8.99, isAvailable: true },
    ]);
    (prisma.order.create as any).mockResolvedValue({
      id: "o1",
      customerName: "Alex",
      tableNumber: "4",
      status: "RECEIVED",
      items: [{ id: "oi1", quantity: 1, priceSnapshot: 8.99, menuItem: { name: "Margherita" } }],
    });

    const res = await POST(
      makeRequest({
        customerName: "Alex",
        tableNumber: "4",
        items: [{ menuItemId: "m1", quantity: 1 }],
      })
    );
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.order.status).toBe("RECEIVED");
  });
});

describe("GET /api/orders/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 404 for a missing order", async () => {
    (prisma.order.findUnique as any).mockResolvedValue(null);
    const res = await getOrder(new Request("http://localhost/api/orders/x"), {
      params: { id: "x" },
    });
    expect(res.status).toBe(404);
  });

  it("returns the order when found", async () => {
    (prisma.order.findUnique as any).mockResolvedValue({ id: "o1", status: "RECEIVED", items: [] });
    const res = await getOrder(new Request("http://localhost/api/orders/o1"), {
      params: { id: "o1" },
    });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.order.id).toBe("o1");
  });
});
