//import Loading from "../Loading";
import { ISession } from "../../interfaces";
import { GamePhase, Images } from "../../interfaces";

interface TeemoImageProps {
    data: ISession | undefined;
}

const TeemoImage = ({ data }: TeemoImageProps) => {
    const getPhaseImage = (phase: string) => {
        if (phase === GamePhase.INGAME) return Images!.INGAME;
        else if (phase === GamePhase.LOBBY) return Images!.LOBBY;
        else if (phase === GamePhase.MATCHMAKING) return Images!.QUEUE;
    };
    const imageSrc = data ? getPhaseImage(data!.phase) : Images!.MENU;

    return <img src={imageSrc} />
};

export default TeemoImage;