import api from "../api/api";
import useAuth from "./useAuth";
import IAccessToken from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";
import axios from "axios";

const axiosConfig = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  credentials: "include",
  withCredentials: true,
};

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const instance = axios.create({
      headers: axiosConfig,
    });

    const response = await instance.post("/v1/auth/refresh-tokens");

    const user: IUser = response.data.user;
    const accessToken: IAccessToken = response.data.accessToken;

    setAuth({ user: user, accessToken: accessToken });

    /*
    setAuth(() => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { user: prev.user, token: accessToken };
    });
    */

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
