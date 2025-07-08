import { useEffect, useState } from "react";
import { getCart, updateQuantity } from "../services/cart";
import { CheckoutModal } from "./CheckoutModal";
import {  X } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const calculateTotal = (items: any[]) => {
    const amount = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(amount);
  };

  const fetchCart = async () => {
    try {
      const res = await getCart();
      const items = res.data?.data?.items || [];
      setCartItems(items);
      calculateTotal(items);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchCart();
  }, [isOpen]);

  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number
  ) => {
    try {
      await updateQuantity(cartItemId, newQuantity);
      const updatedItems = cartItems
        .map((item) =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const increase = (cartItemId: string, currentQty: number) =>
    handleQuantityChange(cartItemId, currentQty + 1);

  const decrease = (cartItemId: string, currentQty: number) => {
    if (currentQty > 1) {
      handleQuantityChange(cartItemId, currentQty - 1);
    } else {
      handleQuantityChange(cartItemId, 0);
    }
  };

  const handleProceedToCheckout = () => {
    onClose(); // close sidebar
    setIsCheckoutModalOpen(true); // ✅ open modal
  };

  const handleOrderSubmit = (details: {
    name: string;
    email: string;
    address: string;
  }) => {
    console.log("Order placed with details:", details);
    // You can optionally clear the cart or show a toast
  };

  return (
    <>
      {/* ✅ Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />

      <div
        className={`fixed top-0 right-0 w-80 h-screen bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600"
          >
            <X/>
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">
                    {item.product.title}
                  </h3>
                  <p className="text-sm text-gray-500">${item.product.price}</p>
                  <div className="flex items-center mt-1 gap-2">
                    <button
                      onClick={() => decrease(item._id, item.quantity)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increase(item._id, item.quantity)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
