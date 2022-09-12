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
    <tr className="playerTr" key={player.id} style={styles.isParticipating}>
      <td className="playerTd">{Capitalize(player.nickname)}</td>
      <td className="playerTd">{player.isParticipate ? "YES" : "NO"}</td>
    </tr>
  );
};

export default PlayerDetails;
