import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/product";
import type { Product } from "../types";
import { addToCart } from "../services/cart";
import { toast } from "sonner";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    })();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      toast.success("Product added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add product to cart.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Products</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
        {products?.map((product) => (
          <div
            key={product._id}
            className="w-[200px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col"
          >
            <Link to={`/products/${product._id}`}>
              <div className="relative rounded-t-2xl overflow-hidden">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-3 space-y-1">
                <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {typeof product.price === "number"
                    ? `$${product.price.toFixed(2)}`
                    : "Price not available"}
                </p>
              </div>
            </Link>

            <div className="px-3 pb-3 mt-auto">
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full bg-black hover:bg-gray-900 text-white text-sm font-medium py-2 rounded-full shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50"
                disabled={!product.quantity}
              >
                {!product.quantity ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
