import axios from "axios";
import { useQuery } from "react-query";
import IAccessToken from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";

interface LoginProps {
  username: string;
  password: string;
}

interface IRefreshToken {
  token: string;
  expires: Date;
}

interface ITokens {
  access: IAccessToken;
  refresh: IRefreshToken;
}

interface IAuth {
  user: IUser;
  tokens: ITokens;
}

const axiosConfig = {
  "Access-Control-Allow-Origin": "*",
  withCredentials: "true",
  Accept: "application/json",
  "Content-Type": "application/json",
  credentials: "include",
};

const loginUser = async (props: LoginProps) => {
  const jsonBody = JSON.stringify(props);

  // For this training loop get players
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001",
    headers: axiosConfig,
  });

  const trainingResponse = await instance.post("/v1/auth/login", jsonBody);
  return trainingResponse.data;
};

const useLogin = (props: LoginProps) => {
  const { username, password } = props;

  return useQuery<IAuth>(
    ["login", username, password],
    () => loginUser({ username, password }),
    {
      enabled: false,
    }
  );
};

export default useLogin;
