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

// const defaultAuth: IAuthContext = {
//   auth: {
//     user: defaultUser,
//     token: defaultToken,
//   },
// };

const AuthContext = createContext<IAuthContext>({
  auth: {
    user: defaultUser,
    accessToken: defaultToken,
  },
  setAuth: () => {},
});

interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [auth, setAuth] = useState({
    user: defaultUser,
    accessToken: defaultToken,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
