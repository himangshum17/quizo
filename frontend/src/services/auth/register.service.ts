import axiosInstance from "@/utils/axios.utils";

export type registerData = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

export const createNewUser = async (data: registerData) => {
  const response = await axiosInstance.post("/auth/register", data, {
    withCredentials: true,
  });
  return response?.data;
};
