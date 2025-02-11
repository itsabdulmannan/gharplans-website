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
  const { getProduct, getCarouselItems } = useProductHook();
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [carouselItems, setCarouselItems] = useState<Product[]>([]);
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const [minPrice, maxPrice] = selectedPrice
    ? selectedPrice.split("-").map(Number)
    : [undefined, undefined];
  useEffect(() => {
    getCarouselItems(setCarouselItems);
  }, []);

  useEffect(() => {
    getProduct(
      setProductData,
      setLoading,
      selectedCategory,
      minPrice,
      maxPrice,
      offset,
      limit,
      searchQuery
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
          {carouselItems.length > 0 ? (
            carouselItems.map((item) => (
              <div key={item?.id} className="relative h-[350px]">
                <img
                  src={
                    item.colors?.[0]?.image?.split(",")[0] ||
                    "default-image-url"
                  }
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6 text-white text-center z-20">
                  <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                  <p className="mb-4">
                    {item.shortDescription || "No description available."}
                  </p>
                  <Link to={`/shop/product/${item.id}`}>
                    <button className="bg-[#792099] text-white font-semibold shadow-md hover:bg-[#792099] hover:text-white focus:bg-[#792099] focus:text-white focus:font-semibold focus:shadow-lg transition duration-200 px-4 py-2 cursor-pointer">
                      View Product
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
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
              className="group h-full"
            >
              <div className="flex flex-col h-full mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={productItem.colors?.[0]?.image || "default-image-url"}
                    alt={productItem.name}
                    className="h-48 w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
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
