import { axiosInstance } from "@/axios";

export const testApiRequest = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (err) {
    console.error(err)
  }
}
