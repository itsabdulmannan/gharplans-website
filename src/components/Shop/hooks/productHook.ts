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
  const getFeaturedProducts = async (
    id: string,
    setFeaturedProducts: Function
  ) => {
    try {
      const response = await Apis.getFeaturedProducts(id);
      setFeaturedProducts(response.data.data);
      return response.data.products;
    } catch (error) {}
  };
  const postReview = async (id: number, rating: number, review: string) => {
    try {
      const body = {
        productId: id,
        rating: rating,
        review: review,
      };
      console.log(body);
      const response = await Apis.postReview(body);
      return response;
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };
  const getReviews = async (id: number, setReviewsData: Function) => {
    try {
      let status = "approved";
      const respsone = await Apis.getReviews(id, status);
      setReviewsData(respsone.data.data);
      return respsone.data.reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  return {
    getProduct,
    getCategory,
    getProductById,
    getFeaturedProducts,
    postReview,
    getReviews,
  };
};
