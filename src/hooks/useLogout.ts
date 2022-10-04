import axios from "axios";
import useAuth from "./useAuth";

const axiosConfig = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  credentials: "include",
  withCredentials: true,
};

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    setAuth({
      user: {
        id: "",
        username: "",
        email: "",
        password: "",
        role: "",
        isEmailVerified: false,
      },
      tokens: {
        access: { token: "", expires: new Date(0) },
        refresh: { token: "", expires: new Date(0) },
      },
    });
    try {
      const jsonBody = JSON.stringify(auth.tokens.refresh);

      const instance = axios.create({
        headers: axiosConfig,
      });

      const response = await instance.post("/v1/auth/logout", jsonBody);
      // const response = await axios("", {
      //   withCredentials: true,
      //   method: "post",
      // });
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
