import { Apis } from "../../../lib/Api";

export const useProductHook = () => {
  const getProduct = async (setProductData: Function, setLoading: Function) => {
    try {
      const response = await Apis.gepProducts();
      setProductData(response.data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  return { getProduct };
};
