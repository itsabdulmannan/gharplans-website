import { Apis } from "../../../lib/Api";

export const useFavouriteProducts = () => {

  const getFavouriteProducts = async (
    setFavorites: (favorites: any[]) => void
  ): Promise<any> => {
    try {
      const response = await Apis.getFavouriteProducts();
      if (response.status !== 200) {
        throw new Error("Error fetching favourite products");
      }
      setFavorites(response.data.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching favourite products:", error.message);
      throw error;
    }
  };

  const removeFavouriteProduct = async (ProductId: number): Promise<any> => {
    try {
      const response = await Apis.removeFavouriteProduct(ProductId);
      if (response.status !== 200) {
        throw new Error("Error removing favourite product");
      }
      return response.data;
    } catch (error: any) {
      console.error("Error removing favourite product:", error.message);
      throw error;
    }
  };

  return { getFavouriteProducts, removeFavouriteProduct };
};
