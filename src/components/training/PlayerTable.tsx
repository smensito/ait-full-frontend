import { useState } from "react";

import { Capitalize } from "../../utils/index";

import IPlayerInTraining from "../../interfaces/IPlayerInTraining";
import UnsubscribeButton from "./UnsubscribeButton";

interface PlayerTableProps {
  players: IPlayerInTraining[];
}

const PlayerTable = (props: PlayerTableProps) => {
  const { players } = props;

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  interface Column {
    id: "nickname" | "id" | "isParticipate" | "options";
    label: string;
  }

  const columns: readonly Column[] = [
    { id: "nickname", label: "Apodo" },
    {
      id: "isParticipate",
      label: "Asistencia",
    },
    { id: "options", label: "Opciones" },
  ];

  return (
    <div className="">
      <table>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.label}</th>
          ))}
        </tr>
        {players &&
          players.map((player) => {
            return (
              <>
                <tr key={player.id}>
                  <td>{Capitalize(player.nickname)}</td>
                  <td>{player.isParticipate ? "YES" : "NO"}</td>
                  <td className="player__options">
                    <UnsubscribeButton player={player} />
                  </td>
                </tr>
              </>
            );
          })}
      </table>
    </div>
  );
};

export default PlayerTable;
