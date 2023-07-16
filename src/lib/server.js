import { API_URL } from "@env";
import axios from "axios";

const config = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(config);

const authenticateRequests = (requestClient, jwt) => {
  requestClient.interceptors.request.use(
    (config) => {
      config.headers.Authorization = jwt;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export { axiosInstance, authenticateRequests };
