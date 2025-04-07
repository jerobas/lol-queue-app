import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getLockFile } from "./lockfile";
import ApiService from "./axios";
import { IpcMethod } from "../src/interfaces";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let api: ApiService;
let win: BrowserWindow | null;

function createWindow() {
  const lockfile = getLockFile();
  api = new ApiService(lockfile.port, lockfile.password);
  win = new BrowserWindow({
    width: 386,
    height: 678,
    frame: false,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

ipcMain.handle(IpcMethod.GET, async (_event, endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (e) {
    return { error: (e as Error).message };
  }
});

ipcMain.handle(IpcMethod.POST, async (_event, endpoint: string, data?: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (e) {
    return { error: (e as Error).message };
  }
});

ipcMain.handle(IpcMethod.MINIMIZE, () => {
  win?.minimize();
});

ipcMain.handle(IpcMethod.CLOSE, () => {
  win?.close();
});
