import axiosInstance from "@/utils/axios.utils";

export type loginData = {
  email: string;
  password: string;
};

export const loginUser = async (data: loginData) => {
  const response = await axiosInstance.post("/auth/login", data, {
    withCredentials: true,
  });
  return response?.data;
};
