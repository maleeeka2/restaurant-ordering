import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuCard from "@/components/MenuCard";
import { CartProvider, useCart } from "@/lib/CartContext";

function Wrapper({ item }: { item: any }) {
  const { items } = useCart();
  return (
    <div>
      <MenuCard item={item} />
      <span data-testid="cart-count">{items.length}</span>
    </div>
  );
}

const sampleItem = {
  id: "m1",
  name: "Margherita Pizza",
  description: "Classic",
  price: 8.99,
  imageUrl: "https://example.com/pizza.jpg",
  isAvailable: true,
};

describe("MenuCard", () => {
  it("renders item name and price", () => {
    render(
      <CartProvider>
        <MenuCard item={sampleItem} />
      </CartProvider>
    );
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.getByText("$8.99")).toBeInTheDocument();
  });

  it("adds the item to the cart when clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Wrapper item={sampleItem} />
      </CartProvider>
    );
    await user.click(screen.getByText("Add to cart"));
    expect(screen.getByTestId("cart-count").textContent).toBe("1");
  });

  it("disables the button for unavailable items", () => {
    render(
      <CartProvider>
        <MenuCard item={{ ...sampleItem, isAvailable: false }} />
      </CartProvider>
    );
    expect(screen.getByText("Unavailable")).toBeDisabled();
  });
});
