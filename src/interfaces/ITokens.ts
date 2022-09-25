export default interface IAccessToken {
  token: string;
  expires: Date;
}

// interface IRefreshToken {
//   token: string;
//   expires: Date;
// }

// interface IAccessRefreshToken {
//   access: IAccessToken;
//   refresh: IRefreshToken;
// }

// export default interface ITokens {
//   tokens: IAccessRefreshToken;
// }
