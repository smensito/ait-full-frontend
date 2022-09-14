import IPlayerInTraining from "./IPlayerInTraining";

interface ITraining {
  id: string;
  players: IPlayerInTraining[];
  feedback: String;
  date: Date;
}

export default ITraining;
