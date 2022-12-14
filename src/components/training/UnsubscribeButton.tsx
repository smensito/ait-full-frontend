import useDeleteParticipate from "../../hooks/useDeleteParticipate";
import IPlayerInTraining from "../../interfaces/IPlayerInTraining";
import { useTranslation } from "react-i18next";

interface UnsubscribeButtonProps {
  player: IPlayerInTraining;
}

const UnsubscribeButton = (props: UnsubscribeButtonProps) => {
  const { t } = useTranslation()
  const { userId } = props.player;
  const { refetch, isFetching } = useDeleteParticipate({ userId });

  if (isFetching) {
    return <h2>{t('common.fetching')}</h2>;
  }

  return (
    <button
      className="button__participate--delete"
      onClick={() => {
        refetch();
      }}
    >
      {t('common.remove')}
    </button>
  );
};
export default UnsubscribeButton;
