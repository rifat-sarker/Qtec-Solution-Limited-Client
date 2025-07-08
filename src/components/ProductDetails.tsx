import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/product";
import { addToCart } from "../services/cart";
import { toast } from "sonner";
import type { Product } from "../types";
import ReactImageMagnify from "react-image-magnify";

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews">(
    "details"
  );

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
    <div className="p-6 max-w-5xl mx-auto space-y-12">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Magnifier Image */}
        <div className="w-full h-full max-h-[500px]">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "bicycle_img",
                isFluidWidth: true,
                src: product?.image ?? "",
              },
              largeImage: {
                src: product?.image ?? "",
                width: 1200,
                height: 1200,
              },
              enlargedImageContainerStyle: {
                borderRadius: "8px",
                zIndex: 99,
                boxShadow: "0 0 10px rgba(0,0,0,0.15)",
                overflow: "hidden",
                marginLeft: "10px",
              },
              imageStyle: {
                width: "100%",
                height: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "8px",
              },
              isHintEnabled: true,
              shouldUsePositiveSpaceLens: true,
              enlargedImagePosition: "beside",
            }}
          />
        </div>

        {/* Product Info */}
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
            <span className="text-sm font-medium text-red-600">
              Out of Stock
            </span>
          )}

          <p className="text-gray-600">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50"
            disabled={!product.quantity}
          >
            {!product.quantity ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Tabs section */}
      <div className="border-t pt-6">
        {/* Tab Navigation */}
        <div className="flex gap-4 border-b pb-2 mb-4">
          {["details", "specs", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium capitalize transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content with smooth transition */}
        <div className="min-h-[150px] transition-all duration-300 ease-in-out">
          <div
            className={`${
              activeTab === "details" ? "block" : "hidden"
            } transition-opacity`}
          >
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <p>{product.description}</p>
          </div>

          <div
            className={`${
              activeTab === "specs" ? "block" : "hidden"
            } transition-opacity`}
          >
            <h2 className="text-xl font-semibold mb-2">Specifications</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Material: High-quality steel</li>
              <li>Weight: 15.2kg</li>
              <li>Color: {product.color || "N/A"}</li>
              <li>Brand: {product.brand || "Unknown"}</li>
            </ul>
          </div>

          <div
            className={`${
              activeTab === "reviews" ? "block" : "hidden"
            } transition-opacity`}
          >
            <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
            <p className="text-sm italic">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
