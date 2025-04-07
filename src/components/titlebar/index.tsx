import React, { useEffect } from "react";
import { ipc } from "../../utils";
import { IpcMethod } from "../../interfaces";

const TitleBar = () => {
  useEffect(() => {
    document.body.classList.add("select-none");
  }, []);

  return (
    <div
      className="flex items-center justify-between bg-gray-800 text-white px-4 py-2"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      <span className="text-sm">Queemo</span>
      <div
        className="flex space-x-2"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        <button
          onClick={() => ipc(IpcMethod.MINIMIZE, "")}
          className="w-3 h-3 bg-yellow-400 rounded-full"
        />
        <button
          onClick={() => ipc(IpcMethod.CLOSE, "")}
          className="w-3 h-3 bg-red-500 rounded-full"
        />
      </div>
    </div>
  );
};

export default TitleBar;
