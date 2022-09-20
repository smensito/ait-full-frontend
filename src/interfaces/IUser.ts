export default interface IUser {
  id: string;
  username: String;
  email: String;
  password: String;
  role: String;
  isEmailVerified: Boolean;
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
