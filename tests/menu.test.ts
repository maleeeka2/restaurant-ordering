import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    category: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";
import { GET } from "@/app/api/menu/route";

describe("GET /api/menu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns categories with menu items", async () => {
    (prisma.category.findMany as any).mockResolvedValue([
      { id: "c1", name: "Pizzas", slug: "pizzas", menuItems: [{ id: "m1", name: "Margherita" }] },
    ]);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.categories).toHaveLength(1);
    expect(data.categories[0].name).toBe("Pizzas");
  });

  it("returns 500 on database error", async () => {
    (prisma.category.findMany as any).mockRejectedValue(new Error("db down"));

    const res = await GET();
    expect(res.status).toBe(500);
  });
});
