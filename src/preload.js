const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("windowControl", {
  minimize: () => ipcRenderer.send("window-control", "minimize"),
  maximize: () => ipcRenderer.send("window-control", "maximize"),
  close: () => ipcRenderer.send("window-control", "close"),
});
