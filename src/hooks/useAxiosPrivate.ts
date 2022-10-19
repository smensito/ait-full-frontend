import { axiosPrivate } from "../api/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    //request interceptor to add the auth token header to requests
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers?.Authorization) {
          // if (prevAuth.tokens.refresh.token !== "") {
          //   const refreshToken = prevAuth.tokens.refresh.token;
          //   alert(refreshToken);
          //   config.headers!.Authorization = `Bearer ${refreshToken}`;
          // } else {

          if (auth.tokens.access.token) {
            config.headers!.Authorization = `Bearer ${auth?.tokens?.access?.token}`;
          } else {
            config.headers!.Authorization = `Bearer ${auth?.tokens?.access}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true; // Prevent loop inside 403
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
