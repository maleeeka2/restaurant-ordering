import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@cafe.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  const categoriesData = [
    { name: "Pizzas", slug: "pizzas" },
    { name: "Pastas", slug: "pastas" },
    { name: "Drinks", slug: "drinks" },
    { name: "Desserts", slug: "desserts" },
  ];

  const categories: Record<string, string> = {};
  for (const c of categoriesData) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categories[c.slug] = cat.id;
  }

  await prisma.menuItem.deleteMany({});

  const items = [
    { name: "Margherita Pizza", description: "Classic tomato, mozzarella, basil", price: 8.99, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002", categoryId: categories["pizzas"] },
    { name: "Pepperoni Pizza", description: "Loaded with pepperoni and cheese", price: 10.49, imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e", categoryId: categories["pizzas"] },
    { name: "Four Cheese Pizza", description: "Mozzarella, gorgonzola, parmesan, fontina", price: 11.99, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591", categoryId: categories["pizzas"] },
    { name: "Spaghetti Carbonara", description: "Egg, pancetta, parmesan, black pepper", price: 9.49, imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3", categoryId: categories["pastas"] },
    { name: "Penne Arrabbiata", description: "Spicy tomato sauce with garlic and chili", price: 8.49, imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246", categoryId: categories["pastas"] },
    { name: "Fettuccine Alfredo", description: "Creamy parmesan sauce", price: 9.99, imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a", categoryId: categories["pastas"] },
    { name: "Espresso", description: "Rich double shot", price: 2.49, imageUrl: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a", categoryId: categories["drinks"] },
    { name: "Iced Latte", description: "Espresso, milk, ice", price: 3.49, imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5", categoryId: categories["drinks"] },
    { name: "Fresh Lemonade", description: "House-made lemonade", price: 2.99, imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859", categoryId: categories["drinks"] },
    { name: "Tiramisu", description: "Classic Italian coffee dessert", price: 5.49, imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", categoryId: categories["desserts"] },
    { name: "Chocolate Lava Cake", description: "Warm cake with molten center", price: 5.99, imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51", categoryId: categories["desserts"] },
  ];

  for (const item of items) {
    await prisma.menuItem.create({ data: item });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
