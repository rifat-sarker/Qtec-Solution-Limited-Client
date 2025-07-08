import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar";
import { CartSidebar } from "../components/CartSidebar";
import { useState } from "react";
import { Toaster } from "sonner";

const Root = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          // Optional: trigger modal later
        }}
      />
      <div className="max-w-6xl mx-auto p-4">
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
