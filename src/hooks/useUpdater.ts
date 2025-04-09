import { useEffect, useState } from "react";
import { IpcMethod } from "../interfaces";
import { ipc } from "../utils";

const useUpdater = () => {
    const [checkingUpdate, setCheckingUpdate] = useState(true);
    const [processMessage, setProcessMessage] = useState("Checando atualizações");

    useEffect(() => {
        (async () => {
            const update = await ipc(IpcMethod.UPDATER_CHECK, "");

            if (update === null) return setCheckingUpdate(false);
            if (!update) return setCheckingUpdate(false);

            await ipc(IpcMethod.UPDATER_DOWNLOAD, "");
            setProcessMessage("Baixando atualização");
            await ipc(IpcMethod.UPDATER_INSTALL, "");
        })();
    }, []);


    return [checkingUpdate, processMessage] as const;
}

export default useUpdater;