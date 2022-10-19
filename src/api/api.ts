import axios from "axios";

// const BASE_URL = "http://localhost:3001";

export default axios.create({
  // baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

// Interceptor
export const axiosPrivate = axios.create({
  // baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
