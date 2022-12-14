import IPlayerInTraining from "./IPlayerInTraining";

interface ITraining {
  id: string;
  players: IPlayerInTraining[];
  feedback: string;
  date: Date;
}

export default ITraining;
