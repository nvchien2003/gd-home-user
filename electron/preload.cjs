const { contextBridge, ipcRenderer } = require("electron");

const invokeChannels = {
  getVersion: "get-version",
  getPlatform: "get-platform",
};

contextBridge.exposeInMainWorld("electronAPI", {
  ping: () => "pong",
  getVersion: () => ipcRenderer.invoke(invokeChannels.getVersion),
  getPlatform: () => ipcRenderer.invoke(invokeChannels.getPlatform),
});
