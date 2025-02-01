import { Apis } from "../../../lib/Api";

export const useProductHook = () => {
  const getProduct = async (
    setProductData: Function,
    setLoading: Function,
    categoryId?: string
  ) => {
    try {
      console.log(categoryId);
      const response = await Apis.getProducts(categoryId);
      setProductData(response.data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };
  const getCategory = async (
    setCategoryData: Function,
    setLoading: Function
  ) => {
    try {
      const response = await Apis.getCategory();
      setCategoryData(response.data.categories);
      setLoading(false);
    } catch (error) {}
  };

  return { getProduct, getCategory };
};
