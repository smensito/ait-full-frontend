import { useContext } from "react";
import { TrainingContext } from "../context/TrainingContext";

export const useTrainings = () => {
  const { trainingState } = useContext(TrainingContext);

  return {
    players: trainingState.players,
  };
};
