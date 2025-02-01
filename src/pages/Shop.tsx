import React, { useEffect } from "react";
import { Search } from "lucide-react";
import ProductGrid from "../components/Shop/ProductGrid";
import { Product, Category } from "../types";
import { useHook } from "./hooks/useHook";

// Mock data - replace with actual API calls
const ITEMS_PER_PAGE = 12;

const mockCategories: Category[] = [
  { id: "1", name: "Building Materials" },
  { id: "2", name: "Tools" },
  { id: "3", name: "Safety Equipment" },
  { id: "4", name: "Electrical" },
  { id: "5", name: "Plumbing" },
];

const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Construction Product ${i + 1}`,
  category: mockCategories[i % mockCategories.length].name,
  price: Math.floor(Math.random() * 1000) + 50,
  image: `https://source.unsplash.com/featured/400x300/?construction,${i}`,
  description: "High-quality construction material for your projects.",
}));

export default function Shop() {
  const { getCategory } = useHook();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedPrice, setSelectedPrice] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  useEffect(() => {
    getCategory
  }, []);
  // Price ranges
  const priceRanges = [
    { label: "Under $100", range: "under-100" },
    { label: "$100 - $500", range: "100-500" },
    { label: "$500 - $1000", range: "500-1000" },
    { label: "Above $1000", range: "above-1000" },
  ];

  // Filter products based on search, category, and price
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    // Price range filter
    let matchesPrice = true;
    if (selectedPrice) {
      if (selectedPrice === "under-100") {
        matchesPrice = product.price < 100;
      } else if (selectedPrice === "100-500") {
        matchesPrice = product.price >= 100 && product.price <= 500;
      } else if (selectedPrice === "500-1000") {
        matchesPrice = product.price >= 500 && product.price <= 1000;
      } else if (selectedPrice === "above-1000") {
        matchesPrice = product.price > 1000;
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          {/* Category Filter */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  selectedCategory === ""
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All Products
              </button>
              {mockCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    selectedCategory === category.name
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map(({ label, range }) => (
                <button
                  key={range}
                  onClick={() => setSelectedPrice(range)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    selectedPrice === range
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Search bar */}
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

          {/* Products */}
          <ProductGrid products={currentProducts} />

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
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === i + 1
                      ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
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
