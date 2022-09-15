import { useReducer } from "react";
import { ITrainingState } from "../interfaces/ITrainingState";
import { TrainingContext } from "./TrainingContext";
import { trainingsReducer } from "./trainingsReducer";

const INITIAL_STATE: ITrainingState = {
  players: [],
  date: new Date(),
  feedback: "",
};

interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export const TrainingProvider = ({ children }: IChildrenProps) => {
  const [trainingState] = useReducer(trainingsReducer, INITIAL_STATE);

  return (
    <TrainingContext.Provider value={{ trainingState }}>
      {children}
    </TrainingContext.Provider>
  );
};
