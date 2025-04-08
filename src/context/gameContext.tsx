import { createContext, useContext, useState } from "react";
import { GameContextType, Teams, GameProviderProps } from "../interfaces";

const GameContext = createContext<GameContextType>({} as GameContextType);

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [teams, setTeams] = useState<Teams>();

  return (
    <GameContext.Provider value={{ teams, setTeams }}>
      {children}
    </GameContext.Provider>
  );
};
