import { createContext, useState } from "react";
import IAccessToken from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";

interface IAuth {
  user: IUser;
  accessToken: IAccessToken;
}

interface IAuthContext {
  auth: IAuth;
  setAuth: (state: IAuth) => void;
  persist: boolean;
  setPersist: (state: boolean) => void;
}

const defaultToken: IAccessToken = {
  token: "",
  expires: new Date(),
};

const defaultUser: IUser = {
  id: "",
  username: "",
  email: "",
  password: "",
  isEmailVerified: false,
  role: "player",
};

const AuthContext = createContext<IAuthContext>({
  auth: {
    user: defaultUser,
    accessToken: defaultToken,
  },
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
});

interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [auth, setAuth] = useState({
    user: defaultUser,
    accessToken: defaultToken,
  });

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")!) || false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
