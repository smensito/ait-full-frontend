import { Button } from "@mui/material";
import useDeleteParticipate from "../../hooks/useDeleteParticipate";
import IPlayerInTraining from "../../interfaces/IPlayerInTraining";

interface UnsubscribeButtonProps {
  player: IPlayerInTraining;
}

const UnsubscribeButton = (props: UnsubscribeButtonProps) => {
  const { userId } = props.player;
  const { refetch, isFetching } = useDeleteParticipate({ userId });

  if (isFetching) {
    return <h2> Fetching ...</h2>;
  }

  return (
    <Button
      className="button__participate--delete"
      onClick={() => {
        refetch();
      }}
    >
      Remove
    </Button>
  );
};
export default UnsubscribeButton;
