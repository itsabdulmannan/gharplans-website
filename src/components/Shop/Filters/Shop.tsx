import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useHook } from "../../../pages/hooks/useHook";
import ProductListing from "../ProductListing/ProductListing";

export default function Shop() {
  const { getCategory } = useHook();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryData, setCategoryData] = useState<[]>([]);

  useEffect(() => {
    getCategory(setCategoryData);
  }, []);

  const priceRanges = [
    { label: "Under 1000", range: "under-1000" },
    { label: "1000 - 5000", range: "1000-5000" },
    { label: "5000 - 10000", range: "5000-10000" },
    { label: "Above -10000", range: "above-10000" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`w-full text-left px-3 py-2 rounded-md transition duration-200 ${
                  selectedCategory === ""
                    ? "bg-[#f3ffc0] text-[#b1a249] font-semibold shadow-md"
                    : "text-black hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:bg-[#e5ff8c] focus:text-[#8a7d2a] focus:font-semibold focus:shadow-lg"
                }`}
              >
                All Products
              </button>

              {categoryData?.map((category: any) => (
                <button
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedPrice(""); // Reset price when selecting a category
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition duration-200 ${
                    selectedCategory === category.id
                      ? "bg-[#f3ffc0] text-[#b1a249] font-semibold shadow-md"
                      : "text-gray-600 hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:bg-[#e5ff8c] focus:text-[#8a7d2a] focus:font-semibold focus:shadow-lg"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map(({ label, range }) => (
                <button
                  onClick={() => {
                    setSelectedPrice(range);
                    setSelectedCategory("");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition duration-200 ${
                    selectedPrice === range
                      ? "bg-[#f3ffc0] text-[#b1a249] font-semibold shadow-md"
                      : "text-gray-600 hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:bg-[#e5ff8c] focus:text-[#8a7d2a] focus:font-semibold focus:shadow-lg"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-8">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Pass selectedCategory to ProductListing */}
          <ProductListing
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedPrice={selectedPrice}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
                disabled={currentPage === 10}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
