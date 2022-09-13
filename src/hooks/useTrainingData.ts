import { useQuery } from "react-query";
import { ITraining } from "../components/listPlayers/ITraining";

const fetchTraining = async () => {
  const TRAINING_ID = "631f63f45f3d5137b1117d68";

  // For this training loop get players
  const trainingResponse = await fetch(`/v1/trainings/` + TRAINING_ID);
  return await trainingResponse.json();
};

const useTrainingData = () => {
  return useQuery<ITraining>("trainings", fetchTraining);
};

export default useTrainingData;
