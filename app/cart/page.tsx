import CartSidebar from "@/components/CartSidebar";

export default function CartPage() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartSidebar />
    </div>
  );
}
