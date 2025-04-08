import { useGame } from "../../context/gameContext";

const Voip = () => {
  const {teams} = useGame()
  return (
    <div className="overflow-y-auto align-middle justify-center items-center">
      {teams && JSON.stringify(teams, null, 2)}
    </div>
  );
};

export default Voip;
