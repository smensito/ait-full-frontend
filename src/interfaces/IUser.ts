export default interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  basicInfo?: {
    name: string;
    surname: string;
    nickname: string;
    birthday: Date;
    contactInfo?: {
      phoneNumber?: string;
      address?: string;
    };
  };
}
