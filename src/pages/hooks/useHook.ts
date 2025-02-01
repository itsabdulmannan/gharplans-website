import { Apis } from "../../lib/Api";

export const useHook = () => {
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
  return { getCategory };
};
