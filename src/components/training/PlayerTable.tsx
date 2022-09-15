import { useState } from "react";

import IPlayerInTraining from "../../interfaces/IPlayerInTraining";
import PlayerDetails from "./PlayerDetails";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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
    id: "nickname" | "id" | "isParticipate";
    label: string;
  }

  const columns: readonly Column[] = [
    { id: "nickname", label: "Apodo" },
    {
      id: "isParticipate",
      label: "Asistencia",
    },
  ];

  return (
    <>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {players &&
                players.map((player) => {
                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={player.id}
                      >
                        <TableCell>{player.nickname}</TableCell>
                        <TableCell>
                          {player.isParticipate ? "YES" : "NO"}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={players.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default PlayerTable;
