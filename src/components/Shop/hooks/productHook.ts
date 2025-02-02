import { Apis } from "../../../lib/Api";

export const useProductHook = () => {
  const getProduct = async (
    setProductData: Function,
    setLoading: Function,
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number
  ) => {
    try {
      console.log(minPrice, maxPrice);
      const response = await Apis.getProducts(categoryId, minPrice, maxPrice);
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
  const getProductById = async (
    productId: string,
    setPrductByIdData: Function
  ) => {
    try {
      const response = await Apis.getProductById(productId);
      setPrductByIdData(response.data);
      return response.data.product;
    } catch (error) {}
  };
  const getFeaturedProducts = async (id:string, setFeaturedProducts: Function) => {
    try {
      const response = await Apis.getFeaturedProducts(id);
      setFeaturedProducts(response.data.data);
      return response.data.products;
    } catch (error) {}
  };
  return { getProduct, getCategory, getProductById, getFeaturedProducts };
};
