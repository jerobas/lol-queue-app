import React, { createContext, useContext, useState, ReactNode } from "react";
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
}

interface GameProviderProps {
  children: ReactNode;
}

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
