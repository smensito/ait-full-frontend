import { Capitalize } from "../../utils/index";
import useDeleteParticipate from "../../hooks/useDeleteParticipate";
import IPlayerInTraining from "../../interfaces/IPlayerInTraining";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import { useTranslation } from "react-i18next";

interface PlayerDetailsProps {
  player: IPlayerInTraining;
}

const PlayerDetails = (props: PlayerDetailsProps) => {
  const { t } = useTranslation()
  const { player } = props;
  const userId = player.userId;
  const { refetch, isFetching } = useDeleteParticipate({ userId });

  if (isFetching) return <h2>{t('common.loading')}</h2>;
  const styles = {
    isParticipating: {
      backgroundColor: player.isParticipate ? "" : "#8c8c8c",
    },
  };

  return (
    <>
      <TableCell>{Capitalize(player.nickname)}</TableCell>
      <TableCell>{player.isParticipate ? "YES" : "NO"}</TableCell>
      <TableCell className="player__options">
        <Button
          className="button__participate--delete"
          onClick={() => {
            refetch();
          }}
        >
          {t('common.remove')}
        </Button>
      </TableCell>

      <tr className="player" key={player.id} style={styles.isParticipating}>
        <td className="player__name">{Capitalize(player.nickname)}</td>
        <td className="player__participate">
          {player.isParticipate ? "YES" : "NO"}
        </td>
      </tr>
    </>
  );
};

export default PlayerDetails;
