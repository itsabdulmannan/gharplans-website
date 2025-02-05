import { Apis } from "../../lib/Api";

export const useUSers = () => {
  const getUser = async (setUserData: Function) => {
    try {
      const response = await Apis.getUser();
      setUserData(response.data.getUser);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const getOrder = async (userId: number, setOrderData: Function) => {
    try {
      const response = await Apis.getOrder(userId);
      setOrderData(response.data.ordersData);
      return response.data.getOrder;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return { getUser, getOrder };
};
