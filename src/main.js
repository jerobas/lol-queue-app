const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const express = require("express");
const path = require("path");

const {
  getLockFileInfo,
  createLolClient,
  handleAccept,
} = require("./utils/index");
const searchLockfileInput = require("./components/searchLockfileInput");

const { GamePhase } = require("./constants/index");

const localServer = express();

localServer.use(express.static(path.join(__dirname, "assets")));
localServer.use(express.static(path.join(__dirname, "view")));

localServer.get("/events", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    await getLockFileInfo();
    const api = createLolClient();

    const intervalId = setInterval(async () => {
      try {
        const response = await handleAccept(api);
        if (response.phase == GamePhase.READYCHECK) {
          handleAccept(api);
          res.write(
            `data: ${JSON.stringify({
              message: response.phase,
            })}\n\n`
          );
        } else
          res.write(
            `data: ${JSON.stringify({
              message: response.phase,
            })}\n\n`
          );
      } catch (error) {
        console.error("Error during handleAccept:", error.message);
        clearInterval(intervalId);
        res.end();
      }
    }, 2000);

    req.on("close", () => {
      clearInterval(intervalId);
      res.end();
    });
  } catch (error) {
    console.error("Error initializing events:", error.message);
    res.status(500).send("Error initializing SSE");
  }
});

localServer.get("/home", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath);
});

localServer.listen(3000, () => {
  console.log("Local server is running on http://localhost:3000");
});

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
  win.loadURL("http://localhost:3000/home");

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
