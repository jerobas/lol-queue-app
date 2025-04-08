import { useEffect, useState } from "react";
import { IpcMethod, ISession } from "../../interfaces";
import { GamePhase, Images } from "../../interfaces";
import { ipc } from "../../utils";

interface TeemoImageProps {
  data: ISession | undefined;
}

const TeemoImage = ({ data }: TeemoImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  const getPhaseImage = async (phase: string) => {
    if (phase === GamePhase.INGAME)
      return await ipc(IpcMethod.FILE, Images!.INGAME);
    else if (phase === GamePhase.LOBBY)
      return await ipc(IpcMethod.FILE, Images!.LOBBY);
    else if (phase === GamePhase.MATCHMAKING)
      return await ipc(IpcMethod.FILE, Images!.QUEUE);
    return await ipc(IpcMethod.FILE, Images!.MENU);
  };

  useEffect(() => {
    const loadImage = async () => {
      const src = data
        ? await getPhaseImage(data.phase)
        : await ipc(IpcMethod.FILE, Images!.MENU);
      setImageSrc(src);
    };
    loadImage();
  }, [data]);

  return <img src={imageSrc} />;
};

export default TeemoImage;
