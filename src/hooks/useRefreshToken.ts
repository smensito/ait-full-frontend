import api from "../api/api";
import useAuth from "./useAuth";
import IAccessToken from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await api.get("/refresh-tokens", {
      withCredentials: true,
    });

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
