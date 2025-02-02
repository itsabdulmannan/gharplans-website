import { Link } from "react-router-dom";
import { Product } from "../../../types/index";
import { useEffect, useState } from "react";
import { useProductHook } from "../hooks/productHook";

export default function ProductListing({
  searchQuery,
  selectedCategory,
  selectedPrice,
  currentPage,
  setCurrentPage,
}: {
  searchQuery: string;
  selectedCategory: string;
  selectedPrice: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { getProduct } = useProductHook();
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);
  console.log(minPrice, maxPrice);

  useEffect(() => {
    getProduct(
      setProductData,
      setLoading,
      selectedCategory,
      minPrice,
      maxPrice
    );
  }, [selectedCategory, currentPage]);
  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {loading ? (
        <div>Loading...</div>
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((productItem) => (
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
      ) : (
        <div>No Product Found</div>
      )}
    </div>
  );
}
