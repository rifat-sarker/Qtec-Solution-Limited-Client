import { useEffect, useState } from "react";
import { getCart, updateQuantity } from "../services/cart";


interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

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
      handleQuantityChange(cartItemId, 0); // remove if qty drops to 0
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-96 w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-600">
          ✕
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
                <h3 className="text-sm font-semibold">{item.product.title}</h3>
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

      <div className="border-t p-4">
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
