import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validations";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message || "Invalid order data" },
      { status: 400 }
    );
  }

  const { customerName, tableNumber, instructions, items } = parsed.data;

  try {
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: items.map((i) => i.menuItemId) } },
    });

    if (menuItems.length !== new Set(items.map((i) => i.menuItemId)).size) {
      return NextResponse.json({ error: "One or more menu items are invalid" }, { status: 400 });
    }

    const unavailable = menuItems.find((m) => !m.isAvailable);
    if (unavailable) {
      return NextResponse.json(
        { error: `${unavailable.name} is currently unavailable` },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        tableNumber,
        instructions: instructions || null,
        status: "RECEIVED",
        items: {
          create: items.map((i) => {
            const menuItem = menuItems.find((m) => m.id === i.menuItemId)!;
            return {
              menuItemId: i.menuItemId,
              quantity: i.quantity,
              priceSnapshot: menuItem.price,
            };
          }),
        },
      },
      include: { items: { include: { menuItem: true } } },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
