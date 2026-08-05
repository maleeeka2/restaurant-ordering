"use client";

import { useCart } from "@/lib/CartContext";

export type MenuItemData = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
};

export default function MenuCard({ item }: { item: MenuItemData }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-36 object-cover rounded-md mb-3"
      />
      <h3 className="font-semibold text-lg">{item.name}</h3>
      <p className="text-sm text-cafe-700 flex-1">{item.description}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold">${item.price.toFixed(2)}</span>
        <button
          disabled={!item.isAvailable}
          onClick={() =>
            addItem({ menuItemId: item.id, name: item.name, price: item.price })
          }
          className="bg-cafe-500 disabled:bg-gray-300 text-white text-sm px-3 py-1.5 rounded-md hover:bg-cafe-600 transition"
        >
          {item.isAvailable ? "Add to cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
