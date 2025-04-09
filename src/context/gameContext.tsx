import { createContext, useContext, useState } from "react";
import {
  GameContextType,
  Teams,
  GameProviderProps,
  ISession,
} from "../interfaces";

const GameContext = createContext<GameContextType>({} as GameContextType);

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [teams, setTeams] = useState<Teams>();
  const [data, setData] = useState<ISession>();

  return (
    <GameContext.Provider value={{ teams, setTeams, data, setData }}>
      {children}
    </GameContext.Provider>
  );
};
