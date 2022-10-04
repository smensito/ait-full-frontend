import useAuth from "./useAuth";
import { IAccessToken, IRefreshToken } from "../interfaces/ITokens";
import axios from "axios";

const axiosConfig = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  credentials: "include",
  withCredentials: true,
};

const useRefreshToken = () => {
  const { setAuth, prevAuth } = useAuth();

  const refresh = async () => {
    const instance = axios.create({
      headers: axiosConfig,
    });

    const response = await instance.post("/v1/auth/refresh-tokens");

    const accessToken: IAccessToken = response.data.access.token;
    const refreshToken: IRefreshToken = response.data.refresh.token;

    setAuth({
      user: prevAuth.user,
      tokens: { access: accessToken, refresh: refreshToken },
    });

    // setAuth((prev: IAuth) =>
    //   prev
    //     ? {
    //         ...prev,
    //         user: user,
    //         accessToken: accessToken,
    //       }
    //     : {
    //         user: defaultUser,
    //         accessToken: defaultToken,
    //       }
    // );

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
