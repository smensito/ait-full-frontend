import { useEffect, useState } from "react";
import { IPlayer } from "../interfaces/IObjects";
import PlayerDetails from "../components/listPlayers/PlayerDetails";

const Home = () => {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response: Response = await fetch("/v1/users/");
      const json = await response.json();

      if (response.ok) {
        console.log(json.results);
        setPlayers(json.results);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="home">
      <h2>Rugby Players</h2>
      <div className="players">
        {players &&
          players.map((player) => (
            <PlayerDetails key={player.id} player={player} />
          ))}
      </div>
    </div>
  );
};

export default Home;
