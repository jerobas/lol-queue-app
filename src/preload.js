const { contextBridge, ipcRenderer } = require("electron");
const { version } = require("./constants/index");

contextBridge.exposeInMainWorld("windowControl", {
  minimize: () => ipcRenderer.send("window-control", "minimize"),
  maximize: () => ipcRenderer.send("window-control", "maximize"),
  close: () => ipcRenderer.send("window-control", "close"),
});

contextBridge.exposeInMainWorld("appInfo", {
  version: version,
});

contextBridge.exposeInMainWorld("sys", {
  update: () => ipcRenderer.send("restart_app"),
  onUpdateDownloaded: (callback) =>
    ipcRenderer.on("update_downloaded", callback),
  onUpdateAvailable: (callback) => ipcRenderer.on("update_available", callback),
  onUpdateNotAvailable: (callback) =>
    ipcRenderer.on("update_not_available", callback),
  onUpdateError: (callback) => ipcRenderer.on("update_error", callback),
});
