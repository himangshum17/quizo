import axiosInstance from "@/utils/axios.utils";

export const getUser = async () => {
  const response = await axiosInstance.get("/user", {
    withCredentials: true,
  });
  return response?.data;
};
