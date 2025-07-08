import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../services/cart";
import { ShoppingBag } from "lucide-react";




export function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        const items = res.data?.data?.items || [];
        const totalItems = items.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        setItemCount(totalItems);
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };

    fetchCart();
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Qtec Solution Limited
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <button
              onClick={onCartClick}
              className="text-gray-700 hover:text-gray-900 relative"
            >
              <ShoppingBag />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
