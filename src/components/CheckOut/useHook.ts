import { Apis } from "../../lib/Api";

export const useCart = () => {
  const getBankAccountDetails = async (setBankAccountDetails: Function) => {
    try {
      const response = await Apis.bankAccountDetails();
      setBankAccountDetails(response.data);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const createOrder = async (body: any): Promise<any> => {
    try {
      const response = await Apis.createOrder(body);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching cart:", error.message);
      throw error;
    }
  };
  const getUser = async (setUserData: Function): Promise<any> => {
    try {
      const response = await Apis.getUser();
      setUserData(response.data.getUser);
      return response;
    } catch (error: any) {
      console.error("Error fetching user:", error.message);
      throw error;
    }
  };

  return { getBankAccountDetails, createOrder, getUser };
};
