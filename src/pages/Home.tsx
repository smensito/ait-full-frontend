import { useQuery } from "react-query";
import fetchTraining from "../components/listPlayers/fetchTraining";
import { IPlayerInTraining } from "../components/listPlayers/IPlayerInTraining";
import PlayerTable from "../components/listPlayers/PlayerTable";
import { FormatDate } from "../utils/index";

const Home = () => {
  const { data, status } = useQuery("trainings", fetchTraining);

  if (status === "loading") {
    return <p> Loading ... </p>;
  }
  if (status === "error") {
    return <p> Error!</p>;
  }

  if (status === "success") {
  }

  return (
    <div className="home">
      <div className="row">
        <div className="col">
          <h2>Training day {FormatDate(data.date)}</h2>
          <h3>
            Number of players for the training:{" "}
            <span className="numberPlayersTraining">
              {
                data.players.filter((p: IPlayerInTraining) => {
                  return p.isParticipate;
                }).length
              }
            </span>
          </h3>
        </div>
      </div>
      <div className="players">
        <PlayerTable players={data.players}></PlayerTable>
      </div>
    </div>
  );
};

export default Home;
