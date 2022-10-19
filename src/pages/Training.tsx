import { useLocation, useNavigate } from "react-router-dom";
import PlayerTable from "../components/training/PlayerTable";
import useTrainingData from "../hooks/useTrainingData";
import { FormatDate } from "../utils/index";

const Training = () => {
  const { data, status } = useTrainingData();
  const navigate = useNavigate();
  const location = useLocation();

  if (status === "loading") {
    return <p> Loading ... </p>;
  }

  if (status === "error" || !data) {
    // TODO: Check if status is forbidden -> 403 -> then go to login page
    navigate("/login", { state: { from: location }, replace: true });
    return <p> Error!</p>;
  }

  const playersTraining = data.data.players.filter(({ isParticipate }) => {
    return isParticipate;
  }).length;

  return (
    <div className="home">
      {/**
       * Subscribe/unsbuscribe training (player)
       * List of all players joining
       * Training description and details
       * Coach and assistants
       * Title
       * Place
       * Time
       * Material Managers
       **/}

      <div className="row">
        <div className="col">
          <h2>Training day {FormatDate(data.data.date)}</h2>
          <h3>
            Number of players for the training:
            <span className="number_players">{playersTraining}</span>
          </h3>
        </div>
      </div>
      <div>
        <PlayerTable players={data.data.players}></PlayerTable>
      </div>
    </div>
  );
};

export default Training;
