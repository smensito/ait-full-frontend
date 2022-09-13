import { useQuery } from "react-query";
import { ITraining } from "../components/listPlayers/ITraining";
import fetchTraining from "../components/listPlayers/fetchTraining";

const useTrainingData = () => {
  return useQuery<ITraining>("trainings", fetchTraining);
};

export default useTrainingData;
