import { useQuery } from "react-query";
import ITraining from "../interfaces/ITraining";

const fetchTraining = async () => {
  const TRAINING_ID = "632866b50b101421436f626c";

  // For this training loop get players
  const trainingResponse = await fetch(`/v1/trainings/` + TRAINING_ID);
  return await trainingResponse.json();
};

const useTrainingData = () => {
  return useQuery<ITraining>("trainings", fetchTraining);
};

export default useTrainingData;
