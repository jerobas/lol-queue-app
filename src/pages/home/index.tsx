import TeemoImage from "../../components/teemoImage";
import { useGame } from "../../context/gameContext";

const Home = () => {
  const { data } = useGame();

  return (
    <div className="overflow-y-auto align-middle justify-center items-center">
      <TeemoImage data={data} />
    </div>
  );
};

export default Home;
