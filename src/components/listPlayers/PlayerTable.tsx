import { IPlayerInTraining } from "./IPlayerInTraining";
import PlayerDetails from "./PlayerDetails";

interface PlayerTableProps {
  players: IPlayerInTraining[];
}

const PlayerTable = (props: PlayerTableProps) => {
  const { players } = props;

  return (
    <>
      <table className="playerTable">
        <thead className="playerTHead">
          <tr>
            <th className="playerTh">
              <div className="thNickname">Apodo</div>
            </th>
            <th className="playerTh">
              <div className="thJoinTraining">Asistencia</div>
            </th>
          </tr>
        </thead>
        <tbody className="playerTBody">
          {players &&
            players.map((player) => (
              <PlayerDetails key={player.id} player={player} />
            ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};

export default PlayerTable;
