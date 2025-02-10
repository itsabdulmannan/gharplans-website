import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Product } from "../../../types";
import { useFavouriteProducts } from "./useHook";

const FavouriteProducts: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { getFavouriteProducts, removeFavouriteProduct } =
    useFavouriteProducts();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favs = await getFavouriteProducts(setFavorites);
        if (!favs) {
          toast.error("Failed to load favourite items.");
        }
      } catch (error: any) {
        toast.error(`Failed to load favourite items: ${error.message}`);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (ProductId: number) => {
    try {
      await removeFavouriteProduct(ProductId);
      setFavorites(
        favorites.filter((product) => product.id !== ProductId.toString())
      );
      getFavouriteProducts(setFavorites);

      toast.success("Removed from favourites.");
    } catch (error: any) {
      toast.error(`Failed to remove favourite: ${error.message}`);
    }
  };

  if (favorites?.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mt-8">
          Your Favourite Items
        </h1>
        <p className="text-gray-600 text-center mt-4">
          You have no favourite items yet.
        </p>
        <div className="flex justify-center mt-6">
          <Link
            to="/shop"
            className="bg-[#f3ffc0] text-[#b1a249] px-4 py-2 rounded-md hover:bg-[#e5ff8c] transition duration-200"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mt-8 mb-6">
        Your Favourite Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites?.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product?.product?.colors[0]?.image}
                alt={product?.product?.colors[0]?.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {product?.product?.name}
              </h2>
              <p className="mt-2 text-gray-600">
                ${parseFloat(product?.product?.price?.toString()).toFixed(2)}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  to={`/product/${product.product.id}`}
                  className="text-[#b1a249] hover:text-[#8a7d2a] transition duration-200"
                >
                  View Details
                </Link>
                <button
                  onClick={() =>
                    handleRemoveFavorite(Number(product?.product.id))
                  }
                  className="text-red-500 hover:text-red-600 transition duration-200 cursor-pointer"
                >
                  <MdOutlineDelete className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteProducts;
