export default interface ITrainingList {
  results: [
    {
      id: string;
      players: [string];
      feedback: string;
      date: Date;
    }
  ];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
