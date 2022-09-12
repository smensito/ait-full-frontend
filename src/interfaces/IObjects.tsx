export interface IPlayer {
  id: string;
  username: String;
  email: String;
  password: String;
  role: String;
  isEmailVerified: Boolean;
  default: false;
  basicInfo: {
    name: String;
    surname: String;
    nickname: String;
    birthday: Date;
    contactInfo: {
      phoneNumber: String;
      address: String;
    };
  };
}

export interface IResponse {
  results: [
    {
      basicInfo: {
        name: string;
        surname: string;
        nickname: string;
        birthday: Date;
      };
      isEmailVerified: boolean;
      username: string;
      email: string;
      id: string;
    }
  ];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
