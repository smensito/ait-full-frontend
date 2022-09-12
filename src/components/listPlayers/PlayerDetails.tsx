import { IPlayer } from "../../interfaces/IPlayer";

interface PlayerDetailsProps {
  player: IPlayer;
}

const PlayerDetails = (props: PlayerDetailsProps) => {
  const { player } = props;
  return (
    <li key={player.id}>
      <div>{player.basicInfo.name}</div>
      <div>{player.basicInfo.surname}</div>
      <div>{player.basicInfo.nickname}</div>
      <div>{player.basicInfo.contactInfo?.address}</div>
      <div>{player.basicInfo.contactInfo?.phoneNumber}</div>
    </li>
  );
};

export default PlayerDetails;
