import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/product";
import { addToCart } from "../services/cart";
import { toast } from "sonner";
import type { Product } from "../types";

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      if (productId) {
        try {
          const data = await getProductById(productId);
          if (!data) {
            setNotFound(true);
          } else {
            setProduct(data);
          }
        } catch (error) {
          console.error("Product not found or API error:", error);
          setNotFound(true);
        }
      }
    })();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      if (!product) return;
      await addToCart(product._id);
      toast.success("Product added to cart!");
    } catch {
      toast.error("Failed to add product to cart.");
    }
  };

  if (notFound) {
    return (
      <div className="p-6 text-center text-red-600 text-xl">
        Product not found.
      </div>
    );
  }

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
          className="w-full h-80 object-cover rounded-xl shadow"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-xl text-gray-700 font-semibold">
          ${product.price?.toFixed(2)}
        </p>

        {product.quantity > 0 ? (
          <span className="text-sm font-medium text-green-600">
            In Stock ({product.quantity})
          </span>
        ) : (
          <span className="text-sm font-medium text-red-600">Out of Stock</span>
        )}

        <p className="text-gray-600">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50"
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
