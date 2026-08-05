import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    adminUser: { findUnique: vi.fn() },
    order: { findMany: vi.fn(), update: vi.fn() },
  },
}));

vi.mock("bcryptjs", () => ({
  default: { compare: vi.fn() },
}));

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { POST as login } from "@/app/api/admin/login/route";
import { GET as getOrders } from "@/app/api/admin/orders/route";
import { PATCH as patchOrder } from "@/app/api/admin/orders/[id]/route";

describe("POST /api/admin/login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects invalid email format", async () => {
    const res = await login(
      new Request("http://localhost/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email: "not-an-email", password: "x" }),
      })
    );
    expect(res.status).toBe(400);
  });

  it("rejects unknown admin email", async () => {
    (prisma.adminUser.findUnique as any).mockResolvedValue(null);
    const res = await login(
      new Request("http://localhost/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email: "nope@cafe.com", password: "x" }),
      })
    );
    expect(res.status).toBe(401);
  });

  it("rejects incorrect password", async () => {
    (prisma.adminUser.findUnique as any).mockResolvedValue({
      id: "a1",
      email: "admin@cafe.com",
      passwordHash: "hash",
    });
    (bcrypt.compare as any).mockResolvedValue(false);
    const res = await login(
      new Request("http://localhost/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email: "admin@cafe.com", password: "wrong" }),
      })
    );
    expect(res.status).toBe(401);
  });

  it("logs in with correct credentials and sets a cookie", async () => {
    (prisma.adminUser.findUnique as any).mockResolvedValue({
      id: "a1",
      email: "admin@cafe.com",
      passwordHash: "hash",
    });
    (bcrypt.compare as any).mockResolvedValue(true);
    const res = await login(
      new Request("http://localhost/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email: "admin@cafe.com", password: "admin123" }),
      })
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("set-cookie")).toContain("admin_token");
  });
});

describe("GET /api/admin/orders", () => {
  it("rejects unauthenticated requests", async () => {
    const res = await getOrders(new Request("http://localhost/api/admin/orders"));
    expect(res.status).toBe(401);
  });
});

describe("PATCH /api/admin/orders/[id]", () => {
  it("rejects unauthenticated requests", async () => {
    const res = await patchOrder(
      new Request("http://localhost/api/admin/orders/o1", {
        method: "PATCH",
        body: JSON.stringify({ status: "PREPARING" }),
      }),
      { params: { id: "o1" } }
    );
    expect(res.status).toBe(401);
  });

  it("rejects an invalid status value when authenticated", async () => {
    const res = await patchOrder(
      new Request("http://localhost/api/admin/orders/o1", {
        method: "PATCH",
        headers: { cookie: "admin_token=not-a-real-token" },
        body: JSON.stringify({ status: "NOT_REAL" }),
      }),
      { params: { id: "o1" } }
    );
    expect(res.status).toBe(401);
  });
});
