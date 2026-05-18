const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
const devServerUrl = process.env.VITE_DEV_SERVER_URL || "http://127.0.0.1:5173";

let mainWindow = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1024,
    minHeight: 720,
    show: false,
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow = win;

  win.once("ready-to-show", () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    const isAppUrl = isDev
      ? url.startsWith(devServerUrl)
      : url.startsWith("file://");

    if (!isAppUrl) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  if (isDev) {
    win.loadURL(devServerUrl);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  if (process.env.ELECTRON_SMOKE_TEST === "1") {
    win.webContents.once("did-finish-load", () => {
      console.log("electron-smoke:renderer-loaded");
      app.quit();
    });
    win.webContents.once("did-fail-load", (_event, _code, description) => {
      console.error(`electron-smoke:renderer-failed:${description}`);
      app.exit(1);
    });
  }
}

ipcMain.handle("get-version", () => app.getVersion());
ipcMain.handle("get-platform", () => process.platform);

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  mainWindow = null;

  if (process.platform !== "darwin") {
    app.quit();
  }
});
