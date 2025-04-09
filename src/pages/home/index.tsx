import TeemoImage from "../../components/teemoImage";
import { useGame } from "../../context/gameContext";

const Home = () => {
  const { data } = useGame();

  return (
    <div className="overflow-y-auto align-middle justify-center items-center bg-red-400">
      <TeemoImage data={data} />
    </div>
  );
};

export default Home;
