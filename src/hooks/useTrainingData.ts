import { useQuery } from "react-query";
import ITraining from "../interfaces/ITraining";
import useAxiosPrivate from "./useAxiosPrivate";

const useTrainingData = () => {
  const TRAINING_ID = "632866b50b101421436f626c";

  const axiosPrivate = useAxiosPrivate();

  return useQuery(["trainings", TRAINING_ID], () =>
    axiosPrivate.get<ITraining>("/v1/trainings/" + TRAINING_ID)
  );
};

export default useTrainingData;
