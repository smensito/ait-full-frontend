import axios from "axios";
import { useQuery } from "react-query";
import { IAuth } from "../interfaces/ITokens";

interface LoginProps {
  username: string;
  password: string;
}

const axiosConfig = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  credentials: "include",
  withCredentials: true,
};

const loginUser = async (props: LoginProps) => {
  const jsonBody = JSON.stringify(props);

  const instance = axios.create({
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
