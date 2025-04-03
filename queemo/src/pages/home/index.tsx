import useSession from "../../hooks/useSession";
import { GamePhase, Images } from "../../interfaces";

const Home = () => {
  const data = useSession();

  const getPhaseImage = (phase: string) => {
    try {
      if (phase === GamePhase.INGAME) return Images.INGAME;
      else if (phase === GamePhase.LOBBY) return Images.LOBBY;
      else if (phase === GamePhase.MATCHMAKING) return Images.QUEUE;
    } catch (error) {
      return null;
    }
  };
  const imageSrc = data ? getPhaseImage(data!.phase) : Images.MENU;
  return (
    <>
      <div className="overflow-y-auto align-middle justify-center items-center">
        {data && <>{imageSrc && <img src={imageSrc} />}</>}
      </div>
    </>
  );
};

export default Home;
