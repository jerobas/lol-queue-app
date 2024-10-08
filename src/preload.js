const { contextBridge, ipcRenderer } = require("electron");
const { version } = require("./constants/index");

contextBridge.exposeInMainWorld("windowControl", {
  minimize: () => ipcRenderer.send("window-control", "minimize"),
  close: () => ipcRenderer.send("window-control", "close"),
});

contextBridge.exposeInMainWorld("appInfo", {
  version: version,
});
