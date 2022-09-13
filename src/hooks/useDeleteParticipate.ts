import { useQuery } from "react-query";

const deleteParticipate = async (userId: string) => {
  const TRAINING_ID = "631f63f45f3d5137b1117d68";

  // Unsubscribe user from training
  const trainingResponse = await fetch(
    `/v1/trainings/${TRAINING_ID}/${userId}`,
    { method: "DELETE" }
  );
  return await trainingResponse.json();
};

interface DeleteParticipateProps {
  userId: string;
}

const useDeleteParticipate = (props: DeleteParticipateProps) => {
  const { userId } = props;

  return useQuery(
    ["unsubscribe_training", userId],
    () => deleteParticipate(userId),
    { enabled: false }
  );
};

export default useDeleteParticipate;
