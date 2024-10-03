const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const { autoUpdater } = require("electron-updater");
const express = require("express");
const path = require("path");

const {
  getLockFileInfo,
  createLolClient,
  handleAccept,
} = require("./utils/index");

const { GamePhase } = require("./constants/index");

const localServer = express();

localServer.use(express.static(path.join(__dirname, "assets")));

localServer.post("/start", (req, res) => {
  try {
    res.status(200).send("The process started");
  } catch (error) {
    console.error("Error starting LoL client:", error.message);
    res.status(500).send("Error initializing LoL client");
  }
});

localServer.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    getLockFileInfo();
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
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.loadURL("http://localhost:3000/home");

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

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("update-available", () => {
    win.webContents.send("update_available");
  });

  autoUpdater.on("update-not-available", () => {
    win.webContents.send("update_not_available");
  });

  autoUpdater.on("error", (err) => {
    win.webContents.send("update_error", err);
  });

  autoUpdater.on("update-downloaded", () => {
    win.webContents.send("update_downloaded");
  });
};

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("Ctrl+Shift+I", () => {});
  globalShortcut.register("CmdOrCtrl+Shift+I", () => {});
  globalShortcut.register("F12", () => {});

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

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on("window-control", (event, action) => {
  const window = BrowserWindow.getFocusedWindow();

  if (!window) return;

  switch (action) {
    case "minimize":
      window.minimize();
      break;
    case "maximize":
      if (window.isMaximized()) {
        window.restore();
      } else {
        window.maximize();
      }
      break;
    case "close":
      window.close();
      break;
  }
});
