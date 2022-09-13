import { IPlayerInTraining } from "./IPlayerInTraining";

export interface ITraining {
  id: string;
  players: IPlayerInTraining[];
  feedback: String;
  date: Date;
}
