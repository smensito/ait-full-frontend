import { createContext } from "react";
import { ITrainingState } from "../interfaces/ITrainingState";

export type TrainingContextProps = {
  trainingState: ITrainingState;
};

export const TrainingContext = createContext<TrainingContextProps>(
  {} as TrainingContextProps
);
