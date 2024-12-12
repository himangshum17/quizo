import axiosInstance from "@/utils/axios.utils";

export const logoutUser = async () => {
  const response = await axiosInstance.get("/auth/logout", {
    withCredentials: true,
  });
  return response?.data;
};
