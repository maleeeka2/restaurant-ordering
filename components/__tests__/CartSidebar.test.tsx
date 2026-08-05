import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider, useCart } from "@/lib/CartContext";
import { useEffect } from "react";

function Seeded({ children }: { children: React.ReactNode }) {
  const { addItem } = useCart();
  useEffect(() => {
    addItem({ menuItemId: "m1", name: "Margherita Pizza", price: 8.99 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

describe("CartSidebar", () => {
  it("shows an empty state when the cart has no items", () => {
    render(
      <CartProvider>
        <CartSidebar />
      </CartProvider>
    );
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("shows items and updates quantity", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Seeded>
          <CartSidebar />
        </Seeded>
      </CartProvider>
    );
    expect(await screen.findByText("Margherita Pizza")).toBeInTheDocument();
    expect(screen.getByTestId("qty-m1").textContent).toBe("1");
    await user.click(screen.getByLabelText("Increase Margherita Pizza"));
    expect(screen.getByTestId("qty-m1").textContent).toBe("2");
  });
});
