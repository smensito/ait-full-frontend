import IUser from "./IUser";

export interface IAccessToken {
  token: string;
  expires: Date;
}

export interface IRefreshToken {
  token: string;
  expires: Date;
}

export interface ITokens {
  access: IAccessToken;
  refresh: IRefreshToken;
}

export interface IAuth {
  user: IUser;
  tokens: ITokens;
}
