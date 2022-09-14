import PlayerTable from "../components/training/PlayerTable";
import useTrainingData from "../hooks/useTrainingData";
import { FormatDate } from "../utils/index";

const Home = () => {
  const { data, status } = useTrainingData();

  if (status === "loading") {
    return <p> Loading ... </p>;
  }

  if (status === "error" || !data) {
    return <p> Error!</p>;
  }

  const playersTraining = data.players.filter(({ isParticipate }) => {
    return isParticipate;
  }).length;

  return (
    <div className="home">
      <div className="row">
        <div className="col">
          <h2>Training day {FormatDate(data.date)}</h2>
          <h3>
            Number of players for the training:
            <span className="number_players">{playersTraining}</span>
          </h3>
        </div>
      </div>
      <div>
        <PlayerTable players={data.players}></PlayerTable>
      </div>
    </div>
  );
};

export default Home;
