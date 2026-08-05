"use client";

import { useEffect, useState } from "react";
import MenuCard, { MenuItemData } from "@/components/MenuCard";

type CategoryWithItems = {
  id: string;
  name: string;
  slug: string;
  menuItems: MenuItemData[];
};

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setError("Could not load menu. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading menu...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (categories.length === 0)
    return <p className="text-center py-10">No menu items yet. Ask admin to seed the menu.</p>;

  return (
    <div className="space-y-8">
      {categories.map((cat) => (
        <section key={cat.id}>
          <h2 className="text-2xl font-bold mb-3">{cat.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cat.menuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
