import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar";
import { CartSidebar } from "../components/CartSidebar";
import { useState } from "react";

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
      <Outlet />
    </div>
  );
};

export default Root;
