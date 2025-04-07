import { useState, useEffect, useRef, useCallback } from "react";
import { GamePhase, IpcMethod, ISession, Routes } from "../interfaces";
import { ipc } from "../utils";

const useSession = (intervalMS = 1500) => {
  const [data, setData] = useState<ISession>();
  const lastPhase = useRef<any>();

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

      setData((prev) =>
        JSON.stringify(prev) !== JSON.stringify(result) ? result : prev
      );
    }
  }, []);

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, intervalMS);
    return () => clearInterval(interval);
  }, [fetchSession, intervalMS]);
  return data;
};
export default useSession;
