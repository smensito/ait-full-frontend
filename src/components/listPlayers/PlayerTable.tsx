import { IPlayerInTraining } from "./IPlayerInTraining";
import PlayerDetails from "./PlayerDetails";

interface PlayerTableProps {
  players: IPlayerInTraining[];
}

const PlayerTable = (props: PlayerTableProps) => {
  const { players } = props;

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          <th className="header_title">
            <div className="header_title__nickname">Nickname</div>
          </th>
          <th className="header_title">
            <div className="header_title__joining">Going</div>
          </th>
          <th className="header_title">
            <div className="header_title__options">Options</div>
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {players &&
          players.map((player) => (
            <PlayerDetails key={player.nickname} player={player} />
          ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default PlayerTable;
