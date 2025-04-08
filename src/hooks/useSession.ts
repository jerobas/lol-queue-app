import { useState, useEffect, useRef, useCallback } from "react";
import { GamePhase, IpcMethod, ISession, Routes } from "../interfaces";
import { ipc } from "../utils";
import { useGame } from "../context/gameContext";

const useSession = (intervalMS = 1500) => {
  const [data, setData] = useState<ISession>();
  const lastPhase = useRef<any>();
  const { setTeams } = useGame();

  const fetchSession = useCallback(async () => {
    const result: ISession = await ipc(IpcMethod.GET, Routes.SESSION);
    if (result?.error !== GamePhase.ERRORMENU) {
      if (
        result.phase === GamePhase.READYCHECK &&
        lastPhase.current !== GamePhase.READYCHECK
      ) {
        const response = await ipc(IpcMethod.POST, Routes.ACCEPT);

        if (response.state === GamePhase.READYCHECK) {
          await ipc(IpcMethod.POST, Routes.ACCEPT);
        }
      }
      lastPhase.current = result.phase;

      setTeams({
        teamOne: result.gameData.teamOne,
        teamTwo: result.gameData.teamTwo,
      });

      setData((prev) =>
        JSON.stringify(prev) !== JSON.stringify(result) ? result : prev
      );
    }
  }, [setTeams]);

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, intervalMS);
    return () => clearInterval(interval);
  }, [fetchSession, intervalMS]);
  return data;
};
export default useSession;
