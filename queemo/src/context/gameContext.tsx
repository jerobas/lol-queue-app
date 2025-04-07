import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useToast } from "./toastContext";

interface TeamPlayer {
  summonerInternalName: string;
  iconUrl: string;
  [key: string]: any;
}

interface Teams {
  teamOne: TeamPlayer[];
  teamTwo: TeamPlayer[];
}

interface GameContextType {
  teams?: Teams;
  setTeams: React.Dispatch<React.SetStateAction<Teams | undefined>>;
  iconsLoaded: boolean;
  setIconsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<GameContextType>({} as GameContextType);

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [teams, setTeams] = useState<Teams>();
  const [iconsLoaded, setIconsLoaded] = useState<boolean>(false);
  const notify = useToast();

  useEffect(() => {
    if (!iconsLoaded) {
      notify.success("Você já pode entrar na call!");
    }
  }, [iconsLoaded]);

  return (
    <GameContext.Provider
      value={{ teams, setTeams, iconsLoaded, setIconsLoaded }}
    >
      {children}
    </GameContext.Provider>
  );
};
