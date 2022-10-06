import { createContext, useState } from "react";
import usePreviousAuth from "../hooks/usePreviousAuth";
import { IAuth, ITokens } from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";

interface IAuthContext {
  auth: IAuth;
  setAuth: (state: IAuth) => void;
  prevAuth: IAuth;
}

const defaultTokens: ITokens = {
  access: { token: "", expires: new Date() },
  refresh: { token: "", expires: new Date() },
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
    tokens: defaultTokens,
  },
  setAuth: () => {},
  prevAuth: { user: defaultUser, tokens: defaultTokens },
});

interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [auth, setAuth] = useState({
    user: defaultUser,
    tokens: defaultTokens,
  });

  const prevAuth = usePreviousAuth({
    user: defaultUser,
    tokens: defaultTokens,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth, prevAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
