import { useState, useEffect, useRef, useCallback } from "react";
import { GamePhase, IpcMethod, ISession, Routes } from "../interfaces";
import { ipc, findChampionIcon } from "../utils";
import { useGame } from "../context/gameContext";
import { useVoip } from "../context/voipContext";

const useSession = (intervalMS = 2500) => {
  const [data, setData] = useState<ISession>();
  const lastPhase = useRef<any>();
  const { setTeams } = useGame();
  const { setRoomId, setPlayerName, setSummonerId } = useVoip();

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
      if (result.phase === GamePhase.INPROGRESS) {
        const player = await ipc(IpcMethod.GET, Routes.PLAYER);
        const isT1 = result.gameData.teamOne.some(
          ({ summonerId }) => summonerId === player.summonerId
        );

        setRoomId(`${result.gameData.gameId}${isT1 ? "T1" : "T2"}`);
        setSummonerId(player.summonerId);
        setPlayerName(player.name);
      }

      lastPhase.current = result.phase;

      await Promise.all(
        result.gameData.teamOne.map(async (player) => {
          const iconUrl = await findChampionIcon(player.championId);
          player.championIcon = iconUrl;
        })
      );

      await Promise.all(
        result.gameData.teamTwo.map(async (player) => {
          const iconUrl = await findChampionIcon(player.championId);
          player.championIcon = iconUrl;
        })
      );

      setTeams({
        teamOne: result.gameData.teamOne,
        teamTwo: result.gameData.teamTwo,
      });

      setData((prev) =>
        JSON.stringify(prev) !== JSON.stringify(result) ? result : prev
      );
    }
  }, [setPlayerName, setRoomId, setTeams, setSummonerId]);

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, intervalMS);
    return () => clearInterval(interval);
  }, [fetchSession, intervalMS]);
  return data;
};
export default useSession;
