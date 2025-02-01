import { Link } from "react-router-dom";
import { Product } from "../../types";
import { useProductHook } from "./hooks/productHook";
import { useEffect, useState } from "react";

export default function ProductCard() {
  const { getProduct } = useProductHook();
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (productData.length === 0) {
      getProduct(setProductData, () => setLoading(false));
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        productData.map((productItem) => (
          <Link
            key={productItem.id}
            to={`/shop/product/${productItem.id}`}
            className="group"
          >
            <div className="mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={productItem.colors?.[0]?.image || "default-image-url"}
                  alt={productItem.name}
                  className="h-48 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm text-gray-700">{productItem.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${productItem.price}
                </p>
                <span className="mt-1 text-sm text-gray-500">
                  {productItem.category?.name || "Unknown Category"}
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
