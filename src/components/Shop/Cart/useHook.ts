import { Apis } from "../../../lib/Api";

export const useCart = () => {
  const getCart = async (setCartData: Function): Promise<any> => {
    try {
      const response = await Apis.getCart();
      setCartData(response.data.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching cart:", error.message);
      throw error;
    }
  };
  const removerCart = async (id: number): Promise<any> => {
    try {
      const response = await Apis.removeFromCart(id);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching cart:", error.message);
      throw error;
    }
  };
  const updateCart = async (
    id: number,
    quantity: number,
    productId: number
  ): Promise<any> => {
    try {
      const response = await Apis.updateQuantity(id, quantity, productId);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching cart:", error.message);
      throw error;
    }
  };
  return { getCart, removerCart, updateCart };
};
