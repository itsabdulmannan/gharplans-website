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
  return { getUser };
};
