const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");

if (process.env.HOT_RELOAD !== "true") {
  const startServer = require("./server");

  startServer();
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 386,
    height: 678,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }
  win.setMenuBarVisibility(false);
  // win.webContents.openDevTools()
  win.loadURL(`http://localhost:${global.port}/home`);

  win.on('maximize', () => {
    mainWindow.unmaximize();
  });

  win.webContents.on("before-input-event", (event, input) => {
    if (
      (input.control || input.meta) &&
      input.shift &&
      input.key.toLowerCase() === "i"
    ) {
      event.preventDefault();
    }
    if (input.key === "F12") {
      event.preventDefault();
    }
  });
};

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("Ctrl+Shift+I", () => { });
  globalShortcut.register("CmdOrCtrl+Shift+I", () => { });
  globalShortcut.register("F12", () => { });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("window-control", (event, action) => {
  const window = BrowserWindow.getFocusedWindow();

  if (!window) return;

  switch (action) {
    case "minimize":
      window.minimize();
      break;
    case "close":
      window.close();
      break;
  }
});
