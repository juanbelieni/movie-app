import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://yts.mx/api/v2",
});

api.interceptors.response.use((response) => {
  return { ...response, data: response.data.data };
});
