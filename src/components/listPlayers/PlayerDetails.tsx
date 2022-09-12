import { IPlayerInTraining } from "./IPlayerInTraining";

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
      <td className="playerTd">{player.nickname}</td>
      <td className="playerTd">{player.isParticipate ? "SI" : "NO"}</td>
    </tr>
  );
};

export default PlayerDetails;
