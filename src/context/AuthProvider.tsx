import { createContext, useState } from "react";
import IAccessToken from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";

const AuthContext = createContext({
  auth: {},
  setAuth: (user: IUser, token: IAccessToken) => {},
});

interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
