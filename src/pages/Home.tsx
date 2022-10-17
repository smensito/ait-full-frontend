import { useLocation, useNavigate } from "react-router-dom";
import PlayerTable from "../components/training/PlayerTable";
import useTrainingData from "../hooks/useTrainingData";
import { FormatDate } from "../utils/index";
import { useTranslation } from "react-i18next";


const Home = () => {
  const { data, status } = useTrainingData();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();


  if (status === "loading") {
    return <p>{t('common.loading')}</p>;
  }

  if (status === "error" || !data) {
    // TODO: Check if status is forbidden -> 403 -> then go to login page
    navigate("/login", { state: { from: location }, replace: true });
    return <p>{t('common.error')}!</p>;
  }

  const playersTraining = data.data.players.filter(({ isParticipate }) => {
    return isParticipate;
  }).length;

  return (
    <div className="home">
      <div className="row">
        <div className="col">
          <h2>{t('home.trainingDay')}: {FormatDate(data.data.date)}</h2>
          <h3>
          {t('home.numberOfPlayersTraining')}:
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

export default Home;
