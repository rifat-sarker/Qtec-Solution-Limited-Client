import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar";
import { CartSidebar } from "../components/CartSidebar";
import { useState } from "react";
import { Toaster } from "sonner";
import { CheckoutModal } from "../components/CheckoutModal";
import Footer from "../shared/Footer";

const Root = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleSubmitOrder = (details: {
    name: string;
    email: string;
    address: string;
  }) => {
    console.log("Order details:", details);
  };

  return (
    <div>
      <Navbar onCartClick={() => setCartOpen(true)} />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onSubmit={handleSubmitOrder}
      />

      <div className="max-w-6xl mx-auto p-4 min-h-screen">
        <Toaster />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
