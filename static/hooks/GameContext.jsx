import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState();

  return (
    <GameContext.Provider value={{ teams, setTeams }}>
      {children}
    </GameContext.Provider>
  );
};
