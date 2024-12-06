import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState();
  const [iconsLoaded, setIconsLoaded] = useState(false);
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
