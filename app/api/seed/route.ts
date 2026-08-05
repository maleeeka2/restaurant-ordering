import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const categoriesData = [
  { name: "Pizzas", slug: "pizzas" },
  { name: "Pastas", slug: "pastas" },
  { name: "Drinks", slug: "drinks" },
  { name: "Desserts", slug: "desserts" },
];

export async function POST() {
  try {
    const categories: Record<string, string> = {};
    for (const c of categoriesData) {
      const cat = await prisma.category.upsert({
        where: { slug: c.slug },
        update: {},
        create: c,
      });
      categories[c.slug] = cat.id;
    }

    const count = await prisma.menuItem.count();
    if (count === 0) {
      await prisma.menuItem.createMany({
        data: [
          { name: "Margherita Pizza", description: "Classic tomato, mozzarella, basil", price: 8.99, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002", categoryId: categories["pizzas"] },
          { name: "Pepperoni Pizza", description: "Loaded with pepperoni and cheese", price: 10.49, imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e", categoryId: categories["pizzas"] },
          { name: "Spaghetti Carbonara", description: "Egg, pancetta, parmesan, black pepper", price: 9.49, imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3", categoryId: categories["pastas"] },
          { name: "Espresso", description: "Rich double shot", price: 2.49, imageUrl: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a", categoryId: categories["drinks"] },
          { name: "Tiramisu", description: "Classic Italian coffee dessert", price: 5.49, imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", categoryId: categories["desserts"] },
        ],
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
