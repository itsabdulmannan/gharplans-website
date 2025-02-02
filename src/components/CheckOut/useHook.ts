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

  return { getBankAccountDetails };
};
