import axiosBase, { AxiosInstance } from "axios";

export const AxiosUtil = {
  createBase(): AxiosInstance {
    return axiosBase.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });
  },
};
