import { Apis } from "../../../lib/Api";

export const useProductHook = () => {
  const getProduct = async (
    setProductData: Function,
    setLoading: Function,
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number,
    offset: number = 0,
    limit: number = 10,
    searchQuery: string = ""
  ) => {
    try {
      setLoading(true);
      const response = await Apis.getProducts(
        categoryId,
        minPrice,
        maxPrice,
        offset,
        limit,
        searchQuery
      );
      setProductData(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const addToFavourite = async (productId: number) => {
    try {
      const response = await Apis.addToFavourite(productId);
      return response.data;
    } catch (error) {
      console.error("Error adding to favourite:", error);
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
  const featuredProducts = async () => {
    try {
      const response = await Apis.getFeaturedProductsByCategory();
      return response.data.products;
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };
  const addToCart = async (quantity: number, productId: number) => {
    try {
      const body = {
        quantity: quantity,
        productId: productId,
      };
      console.log(body);
      const respsone = await Apis.addToCart(body);
      return respsone.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const getCarouselItems = async (setCarouselItems: Function) => {
    try {
      const response = await Apis.getCaoruselItems();
      setCarouselItems(response.data.data);
    } catch (error) {
      console.error("Error fetching carousel items:", error);
    }
  };
  const getBannerItems = async (setBannerItems: Function) => {
    try {
      const response = await Apis.getBannerItems();
      setBannerItems(response.data);
    } catch (error) {
      console.error("Error fetching banner items:", error);
      return error;
    }
  };
  return {
    getProduct,
    getCategory,
    getProductById,
    getFeaturedProducts,
    postReview,
    getReviews,
    featuredProducts,
    addToFavourite,
    addToCart,
    getCarouselItems,
    getBannerItems,
  };
};
