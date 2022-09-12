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
    contactInfo?: {
      phoneNumber?: String;
      address?: String;
    };
  };
}
