export default interface IPlayerList {
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
