import IPlayerInTraining from "./IPlayerInTraining";

export interface ITrainingState {
  players: IPlayerInTraining[];
  date: Date;
  feedback: string;
}
