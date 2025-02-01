import { Apis } from "../../lib/Api";

export const useHook = () => {
  const getCategory = async (setCategoryData: Function) => {
    try {
      const response = await Apis.getCategory();
      setCategoryData(response.data.categories);
    } catch (error) {}
  };
  return { getCategory };
};
