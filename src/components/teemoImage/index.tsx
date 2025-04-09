import { useEffect, useState } from "react";
import { ISession } from "../../interfaces";
import { GamePhase, Images } from "../../interfaces";

interface TeemoImageProps {
  data?: ISession;
}

const getImageSrc = (phase?: string) => {
  const imageMap: Partial<Record<GamePhase, Images>> = {
    [GamePhase.INPROGRESS]: Images.INGAME,
    [GamePhase.LOBBY]: Images.LOBBY,
    [GamePhase.CHAMPSELECT]: Images.QUEUE,
    [GamePhase.MATCHMAKING]: Images.QUEUE,
  };

  const image = imageMap[phase as GamePhase] || Images.MENU;

  return `https://raw.githubusercontent.com/jerobas/queemo/master/public/images/${image}`;
};

const TeemoImage = ({ data }: TeemoImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    setImageSrc(getImageSrc(data?.phase));
  }, [data?.phase]);

  return <img src={imageSrc} alt="Teemo Phase" />;
};

export default TeemoImage;
