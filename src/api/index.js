import { axiosInstance } from "@/axios";

export const testApiRequest = async () => {
  const response = await axiosInstance.get('/');
  return response.data;
}
