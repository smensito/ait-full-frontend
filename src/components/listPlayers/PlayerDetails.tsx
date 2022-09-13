import { IPlayerInTraining } from "./IPlayerInTraining";
import { Capitalize } from "../../utils/index";

interface PlayerDetailsProps {
  player: IPlayerInTraining;
}

const PlayerDetails = (props: PlayerDetailsProps) => {
  const { player } = props;

  const styles = {
    isParticipating: {
      backgroundColor: player.isParticipate ? "" : "#8c8c8c",
    },
  };

  return (
    <tr className="player" key={player.id} style={styles.isParticipating}>
      <td className="player__name">{Capitalize(player.nickname)}</td>
      <td className="player__participate">
        {player.isParticipate ? "YES" : "NO"}
      </td>
    </tr>
  );
};

export default PlayerDetails;
