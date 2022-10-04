import { createContext, useState } from "react";
import usePreviousAuth from "../hooks/usePreviousAuth";
import { IAuth, ITokens } from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";

interface IAuthContext {
  auth: IAuth;
  setAuth: (state: IAuth) => void;
  prevAuth: IAuth;
  persist: boolean;
  setPersist: (state: boolean) => void;
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
  persist: false,
  setPersist: () => {},
});

interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [auth, setAuth] = useState({
    user: defaultUser,
    tokens: defaultTokens,
  });

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")!) || false
  );

  const prevAuth = usePreviousAuth({
    user: defaultUser,
    tokens: defaultTokens,
  });

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, prevAuth, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
