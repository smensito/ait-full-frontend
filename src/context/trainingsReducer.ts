import IPlayerInTraining from "../interfaces/IPlayerInTraining";
import ITraining from "../interfaces/ITraining";
import { ITrainingState } from "../interfaces/ITrainingState";

type TrainingAction =
  | { type: "fetchTrainings"; payload: IPlayerInTraining[] }
  | { type: "createTraining"; payload: ITraining }
  | { type: "participateTraining"; payload: IPlayerInTraining };

export const trainingsReducer = (
  state: ITrainingState,
  action: TrainingAction
): ITrainingState => {
  switch (action.type) {
    /*
    case "fetchTrainings":
      return { ...state, trainings: action.payload };
      */
    case "participateTraining":
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    default:
      return state;
  }
};
