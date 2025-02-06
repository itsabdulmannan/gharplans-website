import { Link } from "react-router-dom";
import { Product } from "../../../types/index";
import { useEffect, useState } from "react";
import { useProductHook } from "../hooks/productHook";
import { Carousel } from "@material-tailwind/react";

export default function ProductListing({
  searchQuery,
  selectedCategory,
  selectedPrice,
  currentPage,
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
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const [minPrice, maxPrice] = selectedPrice
    ? selectedPrice.split("-").map(Number)
    : [undefined, undefined];

  useEffect(() => {
    getProduct(
      setProductData,
      setLoading,
      selectedCategory,
      minPrice,
      maxPrice,
      offset,
      limit
    );
  }, [selectedCategory, selectedPrice, currentPage]);

  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-5 relative">
        <Carousel
          transition={{ duration: 2 }}
          className="rounded-xl"
          placeholder={<div>Loading...</div>}
          onPointerEnterCapture={() => console.log("Pointer entered")}
          onPointerLeaveCapture={() => console.log("Pointer left")}
        >
          <div className="relative h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 text-white text-center">
              <h3 className="text-2xl font-semibold mb-2">Product Title</h3>
              <p className="mb-4">Some description of the product.</p>
              <button className="bg-[#f3ffc0] text-[#b1a249] font-semibold shadow-md hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:bg-[#e5ff8c] focus:text-[#8a7d2a] focus:font-semibold focus:shadow-lg transition duration-200 px-4 py-2">
                View Product
              </button>
            </div>
          </div>
          <div className="relative h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 text-white text-center">
              <h3 className="text-2xl font-semibold mb-2">Product Title</h3>
              <p className="mb-4">Some description of the product.</p>
              <button className="bg-[#f3ffc0] text-[#b1a249] font-semibold shadow-md hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:bg-[#e5ff8c] focus:text-[#8a7d2a] focus:font-semibold focus:shadow-lg transition duration-200 px-4 py-2">
                View Product
              </button>
            </div>
          </div>
          <div className="relative h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 text-white text-center">
              <h3 className="text-2xl font-semibold mb-2">Product Title</h3>
              <p className="mb-4">Some description of the product.</p>
              <button className="bg-[#f3ffc0] text-[#b1a249] font-semibold shadow-md hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:bg-[#e5ff8c] focus:text-[#8a7d2a] focus:font-semibold focus:shadow-lg transition duration-200 px-4 py-2">
                View Product
              </button>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Product Listing Section */}
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
    </div>
  );
}
